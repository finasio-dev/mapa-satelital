// Get initial data from API
const L = window.L;
const map = L.map('map').setView([40.4165, -3.70256], 2);
let circle = L.circle([40.4165, -3.70256], { radius: 100000 }).addTo(map);

$(document).ready(async () => {
  const satellites = await getAllSatellites();

  // Este bloque recorre la lista de satélites e inserta en el dropdown el id
  satellites.map((satelite) => {
    $('#lista-satelites').append(
      `<li><a class="dropdown-item satelite" href="#" id="${satelite.name}">${satelite.displayName}</a></li>`
    );
  });
  // Eventos
  $('.satelite').on('click', async (event) => {
    const satelliteById = event.target.id;
    // encontrar datos del satélite mediante función getSatelliteById
    const dataSatellite = await getSatelliteById(satelliteById);
    const { tle } = dataSatellite;
    const [nombre, linea1, linea2] = tle;
    console.log(linea1, linea2);
    const satrec = satellite.twoline2satrec(linea1, linea2);
    const positionAndVelocity = satellite.propagate(satrec, new Date());
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(new Date());
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const longitude = positionGd.longitude;
    const latitude = positionGd.latitude;
    const height = positionGd.height;
    const longitudeDeg = satellite.degreesLong(longitude);
    const latitudeDeg = satellite.degreesLat(latitude);
    console.log(latitudeDeg, longitudeDeg);
    punto = [positionAndVelocity.position.x, positionAndVelocity.position.y];

    map.removeLayer(circle);
    circle = L.circle([latitudeDeg, longitudeDeg], { radius: 100000 }).addTo(map);
  });
});

// Leaflet map
const imageUrl =
  'static/images/png-transparent-gps-satellite-blocks-computer-icons-gps-miscellaneous-logo-symbol.png';
const imageBounds = [
  [52.52437, 13.41053],
  [48.8534, 2.3486]
];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// imagen sobre el mapa
L.imageOverlay(imageUrl, imageBounds).addTo(map);
