//Codigo por ILAN Y MAXIS

//--Estado de la app--
let paginaActual = 1;
let totalPaginas = 1;
let filtrosActivos = {};

//--Cargar personajes y renderizar--
async function cargar() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const data = await obtenerPersonajes(paginaActual, filtrosActivos);

  if (!data) {
    document.getElementById("contenedor-cards").innerHTML =
      "<p id='mensaje-vacio'>No se encontraron personajes.</p>";
    actualizarPaginacion(1, 1);
    return;
  }
  
  totalPaginas = data.info.pages;
  renderizarCards(data.results);
  actualizarPaginacion(paginaActual, totalPaginas);
  
  console.log("Página:", paginaActual, "| Total páginas:", totalPaginas);
}

//--Leer filtros del formulario--
function leerFiltros() {
  return {
    nombre:  document.getElementById("inputNombre").value.trim(),
    status:  document.getElementById("selectStatus").value,
    especie: document.getElementById("selectEspecie").value,
    genero:  document.getElementById("selectGenero").value
  };
}

//--Evento buscar--
document.getElementById("btnBuscar").addEventListener("click", () => {
  filtrosActivos = leerFiltros();
  paginaActual = 1;
  console.log("Buscando con filtros:", filtrosActivos);
  cargar();
});

//--Evento limpiar--
document.getElementById("btnLimpiar").addEventListener("click", () => {
  limpiarFiltros();
  filtrosActivos = {};
  paginaActual = 1;
  cargar();
});

//--Evento anterior--
document.getElementById("btnAnterior").addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    cargar();
  }
});

//--Evento siguiente--
document.getElementById("btnSiguiente").addEventListener("click", () => {
  if (paginaActual < totalPaginas) {
    paginaActual++;
    cargar();
  }
});

//--Buscar con Enter--
document.getElementById("inputNombre").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    filtrosActivos = leerFiltros();
    paginaActual = 1;
    cargar();
  }
});

// --Cerrar modal con botón o click fuera--
document.getElementById("modal-cerrar").addEventListener("click", cerrarModal);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay")) cerrarModal();
});

// --Cerrar modal con Escape--
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

//--Carga inicial--
cargar();