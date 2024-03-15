// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Define the color scale for the choropleth
var colorScale = d3.scaleSequential(d3.interpolatePurples)
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

// Define the icons for each income group
var icons = {
  low: L.icon({
    iconUrl: 'low_icon.png',
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16]
  }),
  lower_middle: L.icon({
    iconUrl: 'lower_middle_icon.png',
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16]
  }),
  upper_middle: L.icon({
    iconUrl: 'upper_middle_icon.png',
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16]
  }),
  high: L.icon({
    iconUrl: 'high_icon.png',
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16]
  })
};



// Load the GeoJSON data
fetch('output.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        // Get the coverage value for the current country
        var coverage = feature.properties.coverage;

        // Assign a color based on the coverage value
        var color = colorScale(coverage);

        // Get the income group for the current country
        var income_group = feature.properties.income_group;

        // Determine the icon based on the income group
        var icon;
        if (income_group === 'Low') {
          icon = icons.low;
        } else if (income_group === 'Lower middle') {
          icon = icons.lower_middle;
        } else if (income_group === 'Upper middle') {
          icon = icons.upper_middle;
        } else if (income_group === 'High') {
          icon = icons.high;
        }

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

        // Get the income group for the current country
        var income_group = feature.properties.income_group;

        // Determine the icon based on the income group
        var icon;
        if (income_group === 'Low') {
          icon = icons.low;
        } else if (income_group === 'Lower middle') {
          icon = icons.lower_middle;
        } else if (income_group === 'Upper middle') {
          icon = icons.upper_middle;
        } else if (income_group === 'High') {
          icon = icons.high;
        }

        // Create and bind the marker with the appropriate icon
        L.marker(layer.getBounds().getCenter(), { icon: icon }).addTo(map);
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

var income_legend = L.control({position: 'bottomright'});

income_legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["High", "Upper Middle", "Lower Middle", "Low"];
        income_colors = ['#1f77b4', '#d62728', '#2ca02c', '#ff7f0e']
    div.innerHTML = '<h4>Income Group</h4>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + income_colors[i] + '"></i> ' +
            grades[i] + '<br>';
    }
    return div;
};

income_legend.addTo(map);
