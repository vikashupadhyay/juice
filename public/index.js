
var margin = {top: 40, right: 20, bottom: 30, left: 30},
   width = 1100 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;


   var canvas = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + 150 + "," + margin.top + ")");


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .html(function(d) {
    return "<strong>"+d.drinkName+":</strong> <span style='color:black'>" + d.quantity + "</span>";
  });


canvas.call(tip);


var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var dataAccToConsumption = function(){
	$.get('dataAccToConsuption',function(data){
		Juices = JSON.parse(data)
	var dataSacle = d3.scale.linear().domain([0,6112]).range([430,0]);

	  canvas.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  	canvas.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
   		  .append("text")
      	  .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Frequency");
	canvas.selectAll('.bar')
			.data(Juices)
			.enter().append("line")
			.attr("class","bar")
			.attr("x1",function(d,i){return (i*28)+50})
			.attr("y1",430)
			.attr("x2",function(d,i){return (i*28)+50})
			.attr("y2",function(d,i){return dataSacle(d.quantity)})
			.on('mouseover', tip.show)
	  		.on('mouseout', tip.hide)
			.attr("stroke","orangered")
			.attr("stroke-width",22)
	})
}



