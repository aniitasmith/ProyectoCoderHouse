const botonBusqueda = document.getElementById("botonBusqueda");

botonBusqueda.addEventListener("click", buscar);

cardVacia = ["<h1> El producto no existe <h1>"];

const mostrarItemsEncontrados  = (textoBusqueda) => {
    listaDeItemsMostrados = listaDeItems.filter(item => item.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()));
    listaDeItemsMostrados.length > 0 ? cargarItems(listaDeItemsMostrados, contenedor, false)
    : contenedor.innerHTML = `
        <h1> El producto no existe <h1>`
}

function buscar(e) {
    e.preventDefault();
    const busqueda = document.getElementById("campoBusqueda");
    (busqueda.value.length > 0) ? mostrarItemsEncontrados(busqueda.value) : cargarItems(listaDeItems, contenedor, false);
}