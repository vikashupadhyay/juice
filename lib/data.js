var m = {};

m.allJuices = function(data){
	var d = {};
	var add = 0;
	for (var i = 0; i < data.length; i++) {
		if(!d[data[i].drinkName]){
			d[data[i].drinkName] = +data[i].quantity
		}
		d[data[i].drinkName]+= +data[i].quantity;
	};
	delete d.CTL;
	delete d.ctl;
	delete d['Register User'];
	return d;
};

m.dataInArray = function(data){
	_data = m.allJuices(data);
	var data_in_array = [];
	for(fruit in _data){
		data_in_array.push({drinkName:fruit, quantity:_data[fruit]})
	}
	return data_in_array;
}

module.exports = m;

m.accToMonth = function(data){
	var d = {};
	for (var i = 0; i < data.length; i++) {
		var month = data[i].date.slice(5,7);
		if(!d[month])
			d[month]= data[i].quantity;
		else d[month]+=+data[i].quantity;
	}
	return d;
}

m.accToDay = function(data){
	var d = {};
	for (var i = 0; i < data.length; i++) {
		var date = new Date(data[i].date);
		if(!d[date.getDay()])
			d[date.getDay()] = data[i].quantity;
		else
			d[date.getDay()]+= data[i].quantity;
	}
	return d;
}
m.accToSugarAndSugarLess = function(data){
	var d = {withSugar:0,withoutSugar:0};
	for (var i = 0; i < data.length; i++) {
		if(!data[i].isSugarless)
			d.withSugar+=data[i].quantity;
		else
			d.withoutSugar+=data[i].quantity;
	}
	return d;
}