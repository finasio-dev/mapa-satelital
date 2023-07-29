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
const map = L.map('map').setView([40.4165, -3.70256], 2);
var imageUrl = 'static/images/png-transparent-gps-satellite-blocks-computer-icons-gps-miscellaneous-logo-symbol.png';
var imageBounds = [[52.52437, 13.41053], [48.8534000, 2.3486000]];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//imagen sobre el mapa
L.imageOverlay(imageUrl, imageBounds).addTo(map);
