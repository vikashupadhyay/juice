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