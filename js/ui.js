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

    card.dataset.id = p.id;       
    card.style.cursor = "pointer"; 
    card.addEventListener("click", () => abrirModal(p));

    contenedor.appendChild(card);  
  });

  observarCards();
}

//--Actualizar info de paginación--
function actualizarPaginacion(paginaActual, totalPaginas) {
  document.getElementById("infoPagina").textContent =
    "Página " + paginaActual + " de " + totalPaginas;

  document.getElementById("btnAnterior").disabled = paginaActual <= 1;
  document.getElementById("btnSiguiente").disabled = paginaActual >= totalPaginas;
}

function observarCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay escalonado según la posición de la card
        const index = [...entry.target.parentElement.children].indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 15); // 10ms entre cada card
        observer.unobserve(entry.target); // deja de observar una vez visible
      }
    });
  }, {
    threshold: 0.05 // aparece cuando el 5% de la card es visible
  });

  document.querySelectorAll(".card").forEach(card => observer.observe(card));
}

//--Limpiar filtros del formulario--
function limpiarFiltros() {
  document.getElementById("inputNombre").value = "";
  document.getElementById("selectStatus").value = "";
  document.getElementById("selectEspecie").value = "";
  document.getElementById("selectGenero").value = "";
}

// --Abrir modal con datos del personaje--
async function abrirModal(personaje) {
  const overlay = document.getElementById("modal-overlay");
  const contenido = document.getElementById("modal-contenido");

  const estadoClase = personaje.status.toLowerCase();

  // Render inmediato con los datos que ya tenemos
  contenido.innerHTML = `
    <div class="modal-header">
      <img src="${personaje.image}" alt="${personaje.name}">
      <div class="modal-header-info">
        <h2>${personaje.name}</h2>
        <div class="badge">
          <span class="circulo ${estadoClase}"></span>
          <span>${personaje.status}</span>
        </div>
        <p>🧬 ${personaje.species}${personaje.type ? ` — ${personaje.type}` : ""}</p>
        <p>⚧ ${personaje.gender}</p>
        <p>🌍 Origen: ${personaje.origin.name}</p>
        <p>📍 Última ubicación: ${personaje.location.name}</p>
      </div>
    </div>
    <div class="modal-seccion">
      <h4>Primeros episodios (${personaje.episode.length} en total)</h4>
      <div class="episodios-lista">
        <p class="modal-cargando">Cargando episodios...</p>
      </div>
    </div>
  `;

  overlay.classList.remove("oculto");
  document.body.style.overflow = "hidden"; // bloquea scroll de fondo

  // Fetch de episodios en paralelo
  const episodios = await obtenerEpisodios(personaje.episode);
  const lista = contenido.querySelector(".episodios-lista");

  if (episodios.length === 0) {
    lista.innerHTML = `<p class="modal-cargando">No se pudieron cargar los episodios.</p>`;
    return;
  }

  lista.innerHTML = episodios.map(ep => `
    <div class="episodio-item">
      <span class="episodio-codigo">${ep.episode}</span>
      <span class="episodio-nombre">${ep.name}</span>
      <span class="episodio-fecha">${ep.air_date}</span>
    </div>
  `).join("");
}

// --Cerrar modal--
function cerrarModal() {
  document.getElementById("modal-overlay").classList.add("oculto");
  document.body.style.overflow = ""; // restaura scroll
}