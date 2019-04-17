var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/api');

//setting express
	var app = express();

//connect to mongoDB
	if(mongoose.connect('mongodb://localhost/mood'))
	{
		console.log('Database connected')
	}
	else
	{
		console.log("Database connecton failed");
	}

	mongoose.Promise = global.Promise;

//to make external files work
	app.use(express.static('public'));

//body parser is required to access variables send through post request
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

//setting up routes
	app.use('/api', routes);

//error handling
	app.use(function(err, req, res, next)
	{
		//console.log(err);

		res.status(422).send({error: err.message});
	});

//setup server
	app.listen(process.env.PORT || 3000, function()
	{
		console.log("Server Running");
	});

