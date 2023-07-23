// Custom scripts

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello World');
});

const L = window.L;
const map = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
