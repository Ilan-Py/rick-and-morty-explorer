//Codigo por ILAN Y MAXI


//--Renderizar cards de personajes--
function renderizarCards(personajes) {
  const contenedor = document.getElementById("contenedor-cards");
  contenedor.innerHTML = "";

  if (!personajes || personajes.length === 0) {
    contenedor.innerHTML = "<p id='mensaje-vacio'>No se encontraron personajes.</p>";
    return;
  }

  personajes.forEach(p => {
    const card = document.createElement("article");
    card.classList.add("card");

    const estadoClase = p.status.toLowerCase();

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="card-info">
        <h3>${p.name}</h3>
        <div class="badge">
          <span class="circulo ${estadoClase}"></span>
          <span>${p.status}</span>
        </div>
        <p>🧬 ${p.species}</p>
        <p>📍 ${p.origin.name}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

//--Actualizar info de paginación--
function actualizarPaginacion(paginaActual, totalPaginas) {
  document.getElementById("infoPagina").textContent =
    "Página " + paginaActual + " de " + totalPaginas;

  document.getElementById("btnAnterior").disabled = paginaActual <= 1;
  document.getElementById("btnSiguiente").disabled = paginaActual >= totalPaginas;
}

//--Limpiar filtros del formulario--
function limpiarFiltros() {
  document.getElementById("inputNombre").value = "";
  document.getElementById("selectStatus").value = "";
  document.getElementById("selectEspecie").value = "";
  document.getElementById("selectGenero").value = "";
}