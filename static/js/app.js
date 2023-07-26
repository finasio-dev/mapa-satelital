$(document).ready(async () => {
  // Get initial data from API
  const satellites = await getAllSatellites();

  // Este bloque recorre la lista de satélites e inserta en el dropdown el id
  satellites.map((satelite) => {
    $('#lista-satelites').append(
      `<li><a class="dropdown-item satelite" href="#" id="${satelite.name}">${satelite.displayName}</a></li>`
    );
    return satelite;
  });
  // Eventos
  $('.satelite').on('click', (event) => {
    console.log(event.target.id);
    // (... rest of your JS code)
  });
});

// Leaflet map

const L = window.L;
const map = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
