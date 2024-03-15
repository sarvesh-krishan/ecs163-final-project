// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Define the color scale for the choropleth
var colorScale = d3.scaleSequential(d3.interpolateBlues)
.domain([0, 1])


// Define the highlight function
function highlightFeature(e) {
  var layer = e.target;
  info.update(layer.feature.properties);

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  layer.bringToFront();
}

// Define the reset highlight function
function resetHighlight(e) {
  var layer = e.target;
  info.update();

  layer.setStyle({
      weight: 2,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  });
}

// Define the zoom to feature function
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

// Load the GeoJSON data
fetch('output.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        // Get the coverage value for the current country
        var coverage = feature.properties.coverage;
        var possibleCases = feature.properties.possible_cancer_cases;
        var possibleDeaths = feature.properties.possible_cancer_deaths;

        // Assign a color based on the coverage value
        var color = colorScale(coverage);

        // Return the style options for the current feature
        return {
          fillColor: color,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      },
      onEachFeature: function(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }
    }).addTo(map);
  });

  var info = L.control();

  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
  };
  
  // method to update the info div based on feature properties passed
  info.update = function (props) {
    this._div.innerHTML = '<h4>Statistics</h4>' + (props ?
        '<b>' + props.name + '</b><br />' +
        'Coverage: ' + props.coverage + '<br />' +
        'Possible Cases: ' + props.possible_cancer_cases + '<br />' +
        'Possible Deaths: ' + props.possible_cancer_deaths
        : 'Hover over a country');
};
  
info.addTo(map);

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, .10, .20, .40, 0.60, 0.80, 1.00];
    // Add a title to the legend
    div.innerHTML = '<h4>Coverage</h4>';
    // loop through our coverage intervals and generate a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorScale(grades[i]) + '"></i> ' +
            grades[i] + '<br>';
    }
    return div;
};

legend.addTo(map);
