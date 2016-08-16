var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/api/products', function(req,res){
	res.send(require('../data/products'));
});

app.get('/api/products/:id', function(req,res){
	var collection = require('../data/products').collection;
	var product;
	collection.forEach(function(prod){
		if(prod._id == req.params.id) {
			product = prod;
		}
	});
	res.send(product || {});
});

app.listen(3001,function(){
	console.log('markdown web server is started on port: 3001');
});