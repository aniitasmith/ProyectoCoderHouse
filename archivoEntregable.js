const suma = (a, b) => a + b;
// Constructor de items y sus metodos.
class Item {
    constructor(id, nombre, detalle, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = detalle; //Este dato se usara para dar mas detalle al HTML.
        this.precio = precio;
        this.cantPedida = 0;
        this.stock = stock;
    }

    agregarPedido(cantidad) {
        this.cantPedida += cantidad;
        this.stock -= cantidad;
    }

    calcularPrecio() {
        return this.cantPedida * this.precio;
    }

    verificarStock(cantidad) {
        return this.stock >= cantidad;
    }
}

// Calcular iva para ARG.
const calcularIva = (subtotalCompra) => {
    return (subtotalCompra * 0.21);
}

// Validar que la cantidad ingresada sea un numero.
const validarCantidad = (cantidad) => {
    if (Number.isNaN(parseInt(cantidad))) {
        return 0;
    } else {
        return parseInt(cantidad);
    }
}

// Busqueda de item, validacion de cantidad en stock y adicion al pedido.
function agregarItemAlCarrito(seleccion) {
    let cantidad = 0;
    let seleccionado = listadosItems.filter((item) => item.id === seleccion);
    if (seleccionado.length === 0) {
        alert('El dato ingresado es invalido o no corresponde a ningun articulo');
    } else {
        cantidad = (validarCantidad(prompt(`Ingrese la cantidad de ${seleccionado[0].nombre}:`)))
        if (seleccionado[0].verificarStock(cantidad)) {
            seleccionado[0].agregarPedido(cantidad);
        } else {
            alert(`La cantidad ingresada no se encuentra disponible.\n
         Solo disponemos de ${seleccionado[0].stock} unidades.`)
        }
    }
}

// Imprime la factura con solo los elementos comprados.
function crearMensaje() {
    let encabezado = (` ** ** ** ** TOTAL DE COMPRA ** ** ** ** \n`);
    for (item of listadosItems) {
        if (item.cantPedida > 0) {
            subtotalCompra += item.calcularPrecio();
            mensaje += (` ${item.nombre}   Cantidad: ${item.cantPedida}   $ ${item.calcularPrecio()}\n`);
        }
    }
    let iva = calcularIva(subtotalCompra);
    let totalCompra = suma(iva, subtotalCompra);
    let final = (`SUBTOTAL $ ${subtotalCompra.toFixed(2)} 
     IVA $ ${iva.toFixed(2)}
     TOTAL $ ${totalCompra.toFixed(2)}`);
    return (` ${encabezado} ${mensaje} ${final}`);
}

// Creacion del inventario.
const cuaderno = new Item(1, "Cuaderno / NoteBook", "3 Subject Notebook / Assorted Colours / 300 Pages", 5, 30);
const lapiz = new Item(2, "Lapiz / Lead Pencils", "2HB / 10 units per pack", 1, 30);
const boligrafo = new Item(3, "Boligrafo / Ball Pens", "Ballpoint Stick Pens / 10mm Blue / 12 per Pack", 1.5, 30);
const marcador = new Item(4, "Marcadores Permanentes / Permanent markers", "Permanent Markers Fine Tip Black / 12 per Pack", 7.5, 30);
const cinta = new Item(5, "Cinta Adhesiva / Invisible Tape ", "Invisible Tape with Dispenser / 19 mm x 127 m / 4 per Pack", 6.5, 30);
const pegamento = new Item(6, "Pega Escolar / School glue", "School Glue 118mL", 1, 30);
const papel = new Item(7, "Resma de Papel / Paper", "Multiuse Paper 20 lb White / 500 Sheets", 8, 30);
const resaltador = new Item(8, "Resaltadores / Highlighters", "Style Highlighters Assorted Colours 5 per Pack", 3.5, 30);
const clip = new Item(9, "Clips / Paper Clips", "Paper Clips / 100 Clips Per Box / 5 per Pack", 4.5, 30);
const carpeta = new Item(10, "Carpetas / Folders", "Assorted File Folders Letter Size / 10 per Pack", 3.5, 30);

let listadosItems = [cuaderno, lapiz, boligrafo, marcador, cinta, pegamento, papel, resaltador, clip, carpeta];
let subtotalCompra = 0;

// COMIENZA EL PROGRAMA
do {
    //Cargar solo los items existentes en el Stock.
    let listado = ""
    for (const item of listadosItems) {
        if (item.stock >= 1) {
            listado += (`${item.id}. ${item.nombre} ($ ${item.precio}).\n`);
        }
    }

    let seleccion = parseInt(prompt(` ** SIMULADOR DE LIBRERIA ** 
    Ingrese el numero de la opcion del articulo que sea agregar al carrito: 
    ${listado}`));

    agregarItemAlCarrito(seleccion);

} while ((confirm(` Desea agregar un item mas a la compra?`)));

// Imprimir factura
let mensaje = "";
alert(crearMensaje())