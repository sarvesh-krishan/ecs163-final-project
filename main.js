// Select the container element
var container = d3.select("#visualization");

// Define the data for the bar chart
var data = [10, 20, 30, 40, 50];

// Create an SVG element within the container
var svg = container.append("svg")
    .attr("width", 400)
    .attr("height", 200);

// Create the bars based on the data
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * 40;
    })
    .attr("y", function(d) {
        return 200 - d;
    })
    .attr("width", 30)
    .attr("height", function(d) {
        return d;
    })
    .attr("fill", "steelblue");