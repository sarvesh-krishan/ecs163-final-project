// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// Define the color scale for the choropleth
var colorScale = d3.scaleSequential(d3.interpolateBlues)
  .domain([0, 1]); // Set the domain to match the range of your data

// Load the GeoJSON data
fetch('output.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        // Get the coverage value for the current country/region
        var coverage = feature.properties.coverage; // Access the coverage value using the property name 'countryID'

        // Assign a color based on the coverage value
        var color = colorScale(coverage);

        // Return the style options for the current feature
        return {
          fillColor: color,
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.8
        };
      }
    }).addTo(map);
  });