var fs = require('fs');
var m = require('../lib/data.js')
var data = fs.readFileSync('./juice_orders.json','utf-8');
data = JSON.parse(data)

var express = require('express');
var app = express();

app.use(express.static('./public'));

app.get('/dataAccToConsuption',function(req,res){
	var juices = m.dataInArray(data);
	res.send(JSON.stringify(juices));
})

app.get('/piChartAccToConsumption',function(req,res){
	var juices = m.dataInArray(data);
	res.send(JSON.stringify(juices));
});

app.get('/dataAccToMonth',function(req,res){
	var juices = m.accToMonth(data);
	res.send(JSON.stringify(juices));
})

module.exports = app;