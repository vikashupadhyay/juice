
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


var formatPercent = d3.format("10%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1)
    

var y = d3.scale.linear()
    .range([height,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
//==============================================dataAccToConsumption==========================================//
var dataAccToConsumption = function(){
	$.get('dataAccToConsuption',function(data){
		Juices = JSON.parse(data)
	var dataSacle1 = d3.scale.linear().domain([0,6112]).range([430,0]);

	  canvas.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .attr('stroke-width',"1")
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
			.attr("y2",function(d,i){return dataSacle1(d.quantity)})
			.on('mouseover', tip.show)
	  		.on('mouseout', tip.hide)
			.attr("stroke","steelblue")
			.attr("stroke-width",22)
	})
}

//==============================================dataAccToConsumption chart==========================================//

var marginForMonth = {top: 600, right: 20, bottom: 30, left: 30},
   width = 1100 - marginForMonth.left - marginForMonth.right,
   height1 = 1000 - marginForMonth.top - marginForMonth.bottom;

var canvasForMonth = d3.select("body").append("svg")
    .attr("width", width + marginForMonth.left + marginForMonth.right)
    .attr("height", height1 + marginForMonth.top + marginForMonth.bottom)
    .append("g")
    .attr("transform", "translate(" + 150 + "," + marginForMonth.top + ")");

var dataAccToMonth = function(){
  $.get('/dataAccToMonth',function(data){
    data = JSON.parse(data);
    var dataInArr = [];
    for(month in data){
      dataInArr.push({month:month,Juices:data[month]});
    };
    var dataSacle = d3.scale.linear().domain([0,17000]).range([430,0]);

    canvasForMonth.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .attr('stroke-width',"1")
      // .call(xAxis);

    canvasForMonth.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");
  canvasForMonth.selectAll('.bar')
      .data(dataInArr)
      .enter().append("line")
      .attr("class","bar")
      .attr("x1",function(d,i){return (i*28)+50})
      .attr("y1",430)
      .attr("x2",function(d,i){return (i*28)+50})
      .attr("y2",function(d,i){return dataSacle(d.Juices)})
      .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
      .attr("stroke","steelblue")
      .attr("stroke-width",22)
  });

}
// var svg = d3.select("body").append("svg")
//     .attr("width", 900)
//     .attr("height1", 450)
//   	.append("g")
//     .attr("transform", "translate(" + 500 + "," + 300 + ")");

// var labelArc = d3.svg.arc()
//     .outerRadius(170)
//     .innerRadius(170);


// var arc = d3.svg.arc()
// 			.outerRadius(200)
// 			.innerRadius(0);



// var pie = d3.layout.pie()
// 		.sort(null)
// 		.value(function(d){return d.quantity});

// var color = d3.scale.ordinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// var piChartAccToConsumption = function(){
// 	// document.querySelector("body").innerHTML = '';
// 	$.get('/piChartAccToConsumption',function(data){
// 		Juices = JSON.parse(data);
// 		var g = svg.selectAll('.arc')
// 				.data(pie(Juices))
// 				.enter()
// 				.append('arc')
//  				.attr("class", "arc");

// 			g.append("path")
//       		.attr("d", arc)
//       		.style("fill", function(d,i) {return color(d.drinkName)});
//       		g.append("text")
//       		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
//       		.attr("dy", ".35em")
//       // .text(function(d) { return d.data.age; });
// 	})
// }
