//imports
	var express = require('express');
	var bodyParser = require('body-parser');
	var mongoose = require('mongoose');

//setting express
	var app = express();

//to make external files work
	app.use(express.static('public'));

//body parser is required to access variables send through post request
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

//setting up routes
	app.get('/', function(req, res)
	{
		res.sendFile(__dirname + '/public/ko.html');
	});

	app.use('/mongodb_api', require('./routes/mongodb_api'));

//error handling
	app.use(function(err, req, res, next)
	{
		res.status(422).send({error: err.message});
	});

//setup server
	app.listen(process.env.PORT || 1000, function()
	{
		console.log("Server Running");
	});
