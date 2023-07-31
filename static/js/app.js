// Get initial data from API
const L = window.L;
const map = L.map('map').setView([40.4165, -3.70256], 2);
let punto = [50.5, 30.5];
const GET_SATELLITE_URL = 'https://api.tinygs.com/v1/satellite/';

$(document).ready(async () => {
  const satellites = await getAllSatellites();

  //Este bloque recorre la lista de satélites e inserta en el dropdown el id
  satellites.map((satelite) => {
    $("#lista-satelites").append(`<li><a class="dropdown-item satelite" href="#" id="${satelite.name}">${satelite.displayName}</a></li>`);
  })
  //Eventos
  $(".satelite").on('click', async (event) => {
    const satelliteById = event.target.id;
    //encontrar datos del satélite mediante función getSatelliteById
    const dataSatellite = await getSatelliteById(satelliteById);
    const { tle } = dataSatellite;
    const [nombre, linea1, linea2] = tle;
    console.log(linea1, linea2);
    var satrec = satellite.twoline2satrec(linea1, linea2);
    var positionAndVelocity = satellite.propagate(satrec, new Date());
    var positionEci = positionAndVelocity.position;
    var gmst = satellite.gstime(new Date());
    var positionGd = satellite.eciToGeodetic(positionEci, gmst);
    var longitude = positionGd.longitude,
      latitude = positionGd.latitude,
      height = positionGd.height;
    var longitudeDeg = satellite.degreesLong(longitude),
      latitudeDeg = satellite.degreesLat(latitude);
    console.log(latitudeDeg, longitudeDeg);
    punto = [positionAndVelocity.position.x, positionAndVelocity.position.y]
    L.circle([latitudeDeg, longitudeDeg], { radius: 100000 }).addTo(map);
  });


});

//get a satellites by id

const getSatelliteById = async (id) => {
  const satellite = await fetch(`${GET_SATELLITE_URL}${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .catch((error) => {
      console.warn(error);
    });
  return satellite;
};

// Leaflet map


var imageUrl = 'static/images/png-transparent-gps-satellite-blocks-computer-icons-gps-miscellaneous-logo-symbol.png';
var imageBounds = [[52.52437, 13.41053], [48.8534000, 2.3486000]];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//imagen sobre el mapa
L.imageOverlay(imageUrl, imageBounds).addTo(map);

