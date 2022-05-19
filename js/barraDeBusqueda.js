const botonBusqueda = document.getElementById("botonBusqueda");

botonBusqueda.addEventListener("click", buscar);


function buscar(e) {
    e.preventDefault();
    const busqueda = document.getElementById("campoBusqueda");
    if (busqueda.value.length > 0) {
        listaDeItemsMostrados = listaDeItems.filter(item => item.nombre.toLowerCase().includes(busqueda.value.toLowerCase()));
        cargarItems(listaDeItemsMostrados, contenedor, false);
    } else {
        cargarItems(listaDeItems, contenedor, false);
    }
}