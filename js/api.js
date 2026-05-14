//Codigo por ILAN Y MAXI

//--URL base de la API--
const URL_BASE = "https://rickandmortyapi.com/api/character";

//--Obtener personajes con filtros y página--
async function obtenerPersonajes(pagina = 1, filtros = {}) {
  try {
    //--Armar URL manualmente solo con params con valor--
    let url = URL_BASE + "?page=" + pagina;

    if (filtros.nombre  && filtros.nombre.trim()  !== "") url += "&name="    + encodeURIComponent(filtros.nombre.trim());
    if (filtros.status  && filtros.status         !== "") url += "&status="  + encodeURIComponent(filtros.status);
    if (filtros.especie && filtros.especie        !== "") url += "&species=" + encodeURIComponent(filtros.especie);
    if (filtros.genero  && filtros.genero         !== "") url += "&gender="  + encodeURIComponent(filtros.genero);

    console.log("URL generada:", url);

    const response = await fetch(url);

    console.log("Status HTTP:", response.status);

    if (!response.ok) {
      console.warn("La API no devolvió resultados para:", filtros);
      return null;
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);
    return data;

  } catch (error) {
    console.error("Error en fetch:", error);
    return null;
  }
}

// --Obtener episodios por array de URLs--
async function obtenerEpisodios(urls) {
  // Toma solo los primeros 5 para no saturar
  const primeras = urls.slice(0, 5);
  // Extrae los IDs de las URLs
  const ids = primeras.map(url => url.split("/").pop()).join(",");
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
    const data = await res.json();
    // Si es un solo episodio la API devuelve objeto, no array
    return Array.isArray(data) ? data : [data];
  } catch {
    return [];
  }
}