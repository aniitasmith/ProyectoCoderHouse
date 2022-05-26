//INVENTARIO.  Stock ese reserva para la siguiente entrega. 
const stockItems = [{
        id: 1,
        nombre: "Cuaderno / NoteBook",
        descripcion: "3 Subject Notebook / Assorted Colours / 300 Pages",
        precio: 5,
        stock: 30,
        imagen: "./imagenes/Hilroy 3Subject Notebook 6Assorted Colours300 Pages.jpg"
    },
    {
        id: 2,
        nombre: "Lapiz / Lead Pencils ",
        descripcion: "2 HB / 10 units per pack ",
        precio: 1,
        stock: 30,
        imagen: "./imagenes/2 HB Lead Pencils 10 Pack.jpg"
    },
    {
        id: 3,
        nombre: "Boligrafo / Ball Pens",
        descripcion: "Ballpoint Stick Pens / 10mm Blue / 12 per Pack",
        precio: 1.5,
        stock: 30,
        imagen: "./imagenes/BIC Round Stic Extra Value Ballpoint Stick Pens10mm Blue12 Pack.jpg"
    },
    {
        id: 4,
        nombre: "Marcadores Permanentes / Permanent markers",
        descripcion: "Permanent Markers Fine Tip Black / 12 per Pack",
        precio: 7.5,
        stock: 30,
        imagen: "./imagenes/Staples Permanent Markers Fine Tip Black 12 Pack.jpg"
    },
    {
        id: 5,
        nombre: "Cinta Adhesiva / Invisible Tape ",
        descripcion: "Invisible Tape with Dispenser / 19 mm x 127 m / 4 per Pack",
        precio: 6.5,
        stock: 30,
        imagen: "./imagenes/Invisible Tape with Dispenser  19 mm x 127 m  4 Pack.jpg"
    },
    {
        id: 6,
        nombre: "Pega Escolar / School glue",
        descripcion: "School Glue 118mL",
        precio: 1,
        stock: 30,
        imagen: "./imagenes/Staples School Glue 118mL.jpg"
    },
    {
        id: 7,
        nombre: "Resma de Papel / Paper",
        descripcion: "Multiuse Paper 20 lb White / 500 Sheets",
        precio: 8,
        stock: 30,
        imagen: "./imagenes/Staples Multiuse Paper 20 lb White 500 Sheets.jpg"
    },
    {
        id: 8,
        nombre: "Resaltadores / Highlighters",
        descripcion: "Style Highlighters Assorted Colours 5 per Pack",
        precio: 3.5,
        stock: 30,
        imagen: "./imagenes/Style Highlighters  Assorted Colours 5 Pack.jpg"
    },
    {
        id: 9,
        nombre: "Clips / Paper Clips",
        descripcion: "Paper Clips / 100 Clips Per Box / 5 per Pack",
        precio: 4.5,
        stock: 30,
        imagen: "./imagenes/Paper Clips 100 Clips Per Box 5 Pack.jpg"
    },
    {
        id: 10,
        nombre: "Carpetas / Folders",
        descripcion: "Assorted File Folders Letter Size / 10 per Pack",
        precio: 3.5,
        stock: 30,
        imagen: "./imagenes/Staples Assorted File Folders Letter Size  10 Pack.jpg"
    },
    {
        id: 11,
        nombre: "Notas / Post-it Notes",
        descripcion: "Poptimistic Collection / 5 Pack",
        precio: 3,
        stock: 30,
        imagen: "./Imagenes/Post-it Notes - Poptimistic Collection 5 Pack.jpg"
    },
    {
        id: 12,
        nombre: "TIjeras /  Scissors",
        descripcion: "Titanium Coated Scissors - 2 Pack",
        precio: 15,
        stock: 15,
        imagen: "./Imagenes/Titanium Coated Scissors - 2 Pack.jpg"
    }
];

//guardar en LocalStorage el inventario.
const guardarLocal = (id, producto) => { localStorage.setItem(id, producto) };
guardarLocal("listaDeItems", JSON.stringify(stockItems));