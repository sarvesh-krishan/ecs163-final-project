// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Define the data for the circle overlay
var data = [
    { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
    { lat: 51.5074, lng: -0.1278 },   // London, UK
    { lat: 35.6895, lng: 139.6917 }    // Tokyo, Japan
];

// Loop through the data and add circles to the map
data.forEach(function(d) {
    L.circleMarker([d.lat, d.lng], { radius: 5, color: 'red', fillOpacity: 1 }).addTo(map);
});