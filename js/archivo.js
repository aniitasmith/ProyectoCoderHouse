const contenedor = document.getElementById("listaDeItems");  
const verCarrito = document.getElementById("verCarrito");

// Se crean los elementos necesarios para armar el carrito.
let tabla = document.createElement("table");
let tablaCarrito =document.createElement("tbody");
let facturar =document.createElement("tbody");

// Agregando los id de los elementos del carrito.
tabla.setAttribute("id","carrito");
tablaCarrito.setAttribute("id","tablaCarrito");
facturar.setAttribute("id","cerrarTabla");

// Cargar el inventario de producto con fetch y localstorage.
let listaDeItems, listaDeItemsMostrados;

const traerInventario = () => {
    listaDeItems = JSON.parse(localStorage.getItem("listaDeItems"));
    listaDeItemsMostrados = listaDeItems;
    if (!listaDeItems){
        fetch('data.json')
        .then( (res => res.json()))
        .then (data => {
            listaDeItems = data;
            localStorage.setItem("listaDeItems", JSON.stringify(data));
            cargarItems(data, contenedor,false);
            
        })
    } else {cargarItems(listaDeItemsMostrados, contenedor,false)}
    }

let carrito = JSON.parse(localStorage.getItem("carrito")) || [] ;

tabla.innerHTML = 
`
 <thead>
 <tr>
    <th class="topeDeTabla" scope="col">Nombre</th>
    <th class="topeDeTabla" scope="col">Cantidad</th>
    <th class="topeDeTabla" scope="col">Precio</th>
    </tr>
</thead>`;

// Genera el HTLM en forma de card de los productos en venta.
const cardProductoEnVenta = ({id, imagen, nombre ,precio, descripcion,stock}) => {
    return (
        `
        <div class="card" style="width: 18rem">
            <img src="${imagen}" class="card-img-top imagen-producto" alt="${nombre}">
            <div class="card-body detalles-producto">
                <h5 class="card-title">${nombre}</h5>
                <h6 class="card-text">Precio : ${precio} $</h6>
                <p class="card-text">${descripcion}.</p>
                <div class="compra-producto">
                    <input onChange=validarCantidad(this,${id}) id="cantidad-${id}" type="number" min="0" max=${stock} value="1">
                    <button id="btn-${id}" onclick=agregarItemAlCarrito(${id}) class="btn btn-warning texto-blanco">Comprar</button>
                </div>
            </div>
        </div>
        `);
};

// Genera el HTLM de los item en el carrito.
const armarCarritoPorArticulo = ({id, cantidad}) => {
    const {nombre, precio} = listaDeItems.find(item => item.id === id); 
    return (
        `
        <tr>
            <td> ${nombre} </td>
            <td> ${cantidad} unidades </td> 
            <td > ${precio * cantidad} $ </td>
        </tr>
             `)
};

// Genera el HTML de la lista de articulos en el elemento indicado (contenedor o carrito).
const cargarItems = (listaArticulos, elemento, esCarrito) => {
    let acumulador = "";
    listaArticulos.forEach((el) => {
        acumulador += esCarrito ? armarCarritoPorArticulo(el) : cardProductoEnVenta(el);
        elemento.innerHTML = acumulador;
    })
};

// Genera calculo subtotal por producto.
const subtotalPorProducto = (elemento) => ((listaDeItems.find(item => item.id === elemento.id)).precio) * elemento.cantidad

// Genera los calculos finales de la factura.
const calculoFinalCarrito = () => {
    let subtotal = carrito.reduce((acc, el) => acc + subtotalPorProducto(el), 0);
    let iva = subtotal * 0.21;
    let total = subtotal + iva;
    return { subtotal, iva, total};
}

// Busca item en el carrito.
const buscadorDeItem = (id, cantidad) => {
    const buscarItemEnElCarrito = carrito.findIndex(el => el.id === id);
    (buscarItemEnElCarrito === -1) ? carrito.push({ id, cantidad }) : carrito[buscarItemEnElCarrito].cantidad += cantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Genera el final de la facturacion.
const actualizarFacturacion= () => {
    const {subtotal, total, iva} = calculoFinalCarrito(); 
    let facturarCarrito = (
        `
     <tr>
        <th scope = "row" > SUBTOTAL </th>
         <td>   </td> 
         <td > ${subtotal.toFixed(2)} $ </td>
         </tr>
         <tr>
        <th scope = "row" > IVA </th>
         <td>   </td> 
         <td > ${iva.toFixed(2)} $ </td>
         </tr>
         <tr>
        <th scope = "row" > TOTAL </th>
         <td>   </td> 
         <td > ${total.toFixed(2)} $ </td>
         </tr>`)
    facturar.innerHTML = facturarCarrito
}

// Permite validar que la cantidad ingresada corresponda con el stock.
const validarCantidad = (e,id) => {
    const cantidadInput= parseInt(e.value);
    const item = listaDeItems.find(el => el.id === id);
    if (cantidadInput > parseInt(item.stock) || cantidadInput <= 0){
        e.value = 0;
        Swal.fire({
            icon: 'error',
            title:`El stock de ${item.nombre} es ${item.stock} unidades.
             Intente con otra cantidad.`
        })
    }
}

// Actualiza la cantidad del stock en la lista de Item e inhabilita el boton de compra.
const actualizarStock = (id, cantidad) => {
    const item = listaDeItems.find(el => el.id === id);
    item.stock-= cantidad
    document.getElementById(`btn-${id}`).disabled = parseInt(item.stock) <= 0;
}

// Agrega el item al carrito o actualiza la cantidad si esta previamente agregado, y genera la facturacion. 
const agregarItemAlCarrito = (id) => {
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadInput.value);
    validarCantidad(cantidadInput, id);
    buscadorDeItem(id, cantidad);
    actualizarStock(id,cantidad);
    actualizarFacturacion();
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        timer: 1200,
        showConfirmButton: false
    });
    cantidadInput.value = 0;
    cargarItems(carrito, tablaCarrito, true);
}

// Elimina los articulos en carrito.
const borrarCarrito = () => {
    carrito = [];
    tablaCarrito.innerHTML = "";
    facturacion = {};
    facturar.innerHTML = "";
}

// Resta del stock al generar la compra.
const compraFinalizada = () => {
facturar.innerHTML = "";
    borrarCarrito();
    localStorage.removeItem("carrito");
}

// Mostrar carrito al clickear el boton.
verCarrito.addEventListener("click", () => {
    tabla.appendChild(tablaCarrito);
    tabla.appendChild(facturar);
    Swal.fire({
        title: '<strong>CARRITO</strong>',
        html: tabla,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `Borrar Carrito`,
      }).then((result) => {
          if (result.isConfirmed) {
            compraFinalizada();
            Swal.fire({
                icon: 'success',
                title: 'Su compra fue procesada!'
          })
        } else if (result.isDenied) {
            borrarCarrito();
          Swal.fire({
              icon: 'error',
            title: 'Su compra fue cancelada.'
            })
        }
      })
});

// Carga de Items a la pagina principal. 

traerInventario();
cargarItems(carrito, tablaCarrito, true);
carrito.forEach(el=> {
    actualizarStock(el.id,el.cantidad)});
actualizarFacturacion();