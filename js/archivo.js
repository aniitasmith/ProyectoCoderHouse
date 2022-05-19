const contenedor = document.getElementById("listaDeItems");
const tablaCarrito = document.getElementById("tablaCarrito");
const facturar = document.getElementById("cerrarTabla");
const botonBorrarCarrito = document.getElementById("borrarCarrito");
const botonFinalizarCompra = document.getElementById("finalizarCompra");
const mensajeCompra = document.getElementById("mensajeCompra");

const listaDeItems = JSON.parse(localStorage.getItem("listaDeItems"));
let carrito = localStorage.getItem("carrito") || [];
let listaDeItemsMostrados = listaDeItems;

// Genera el HTLM en forma de card de los productos en venta.
const cardProductoEnVenta = (producto) => {
    return (
        `
        <div class="card" style="width: 18rem">
            <img src="${producto.imagen}" class="card-img-top imagen-producto" alt="${producto.nombre}">
            <div class="card-body detalles-producto">
                <h5 class="card-title">${producto.nombre}</h5>
                <h6 class="card-text">Precio : ${producto.precio} $</h6>
                <p class="card-text">${producto.descripcion}.</p>
                <div class="compra-producto">
                    <input id= "cantidad-${producto.id}" type="number"  min="1" max=${producto.stock}>
                    <button onclick=agregarItemAlCarrito(${producto.id}) class="btn btn-warning texto-blanco">Comprar</button>
                </div>
            </div>
        </div>
    `);
};

// Genera el HTLM del modal de los productos seleccionados.
const armarCarritoPorArticulo = (articuloEnCarrito) => {
    const producto = listaDeItems.find(item => item.id === articuloEnCarrito.id);
    document.getElementById("carrito").style.visibility = "visible";
    mensajeCompra.style.visibility = "hidden";

    return (
        `
         <tr>
            <th scope = "row" > ${producto.nombre} </th>
             <td> ${articuloEnCarrito.cantidad} unidades </td> 
             <td > ${producto.precio * articuloEnCarrito.cantidad} $ </td>
             </tr>`)
};

//genera el HTML de la lista de articulos en el elemento indicado (contenedor o carrito).

const cargarItems = (listaArticulos, elemento, esCarrito) => {
    let acumulador = "";
    listaArticulos.forEach((el) => {
        acumulador += esCarrito ? armarCarritoPorArticulo(el) : cardProductoEnVenta(el);
        elemento.innerHTML = acumulador;
    })
};
// genera los calculos finales de la factura.
const calculoFinalCarrito = () => {
    let subtotal = carrito.reduce((acc, el) => acc + ((listaDeItems.find(item => item.id === el.id)).precio) * el.cantidad, 0);
    let iva = subtotal * 0.21;
    let total = subtotal + iva;
    return { subtotal: subtotal, iva: iva, total: total };
}

// Agrega el item al MODAL del carrito o actualiza la cantidad si esta previamente agregado, y genera la facturacion. 
const agregarItemAlCarrito = (id) => {
    const buscarItemEnElCarrito = carrito.findIndex(el => el.id === id);

    const cantidadPedida = parseInt(document.getElementById(`cantidad-${id}`).value);

    if (buscarItemEnElCarrito === -1) {
        carrito.push({ id: id, cantidad: cantidadPedida });
    } else {
        carrito[buscarItemEnElCarrito].cantidad = carrito[buscarItemEnElCarrito].cantidad + cantidadPedida;
    }

    let facturacion = calculoFinalCarrito();

    let facturarCarrito = (
        `
     <tr>
        <th scope = "row" > SUBTOTAL </th>
         <td>   </td> 
         <td > ${facturacion.subtotal.toFixed(2)} $ </td>
         </tr>
         <tr>
        <th scope = "row" > IVA </th>
         <td>   </td> 
         <td > ${facturacion.iva.toFixed(2)} $ </td>
         </tr>
         <tr>
        <th scope = "row" > TOTAL </th>
         <td>   </td> 
         <td > ${facturacion.total.toFixed(2)} $ </td>
         </tr>`)
    facturar.innerHTML = facturarCarrito

    cargarItems(carrito, tablaCarrito, true);
}

// Elimina los articulos en carrito.
const borrarCarrito = () => {
    carrito = []
    tablaCarrito.innerHTML = ""
    facturacion = {};
    facturar.innerHTML = "";
}

// Mensaje de compra generada.
const compraFinalizada = () => {
    document.getElementById("carrito").style.visibility = "hidden";
    mensajeCompra.style.visibility = "visible";
    facturar.innerHTML = ""
    borrarCarrito();
}
botonBorrarCarrito.addEventListener("click", borrarCarrito);
botonFinalizarCompra.addEventListener("click", compraFinalizada);

//Carga de Items a la pagina principal. 
cargarItems(listaDeItemsMostrados, contenedor, false);