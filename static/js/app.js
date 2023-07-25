// Get initial data from API

const GET_ALL_SATELLITES_URL = 'https://api.tinygs.com/v1/satellites';
// const GET_SATELLITE_URL = 'https://api.tinygs.com/v1/satellite/{id}';

$(document).ready(async () => {
  const satellites = await getAllSatellites();

  console.log(satellites);
});

// Get all satellites from API
const getAllSatellites = async () => {
  const satellites = await fetch(GET_ALL_SATELLITES_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .catch((error) => {
      console.warn(error);
    });
  return satellites;
};

// Leaflet map

const L = window.L;
const map = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
