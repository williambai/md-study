var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3001,function(){
	console.log('markdown web server is started on port: 3001');
});