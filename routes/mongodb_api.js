var express = require('express');

var app = express();

//mongoDB database connection
	var db = require('monk')('mongodb://localhost/mood');

	var ninjas = db.get('ninjas');

//routes		
	app.get('/all_users', function(req, res, next)
	{		
		ninjas.find({}, function(err, data)
		{
			if(err)
			{
				res.send({error: "database error"});
			}
			else
			{
				res.send(data);
			}
		});
	});

	app.get('/user', function(req, res, next)
	{
		ninjas.findOne({name: req.query.name}, function(err, data)
		{
			if(err)
			{
				res.send({error: "database error"});
			}
			else
			{
				res.send(data);
			}
		});
	});

	app.post('/add_user', function(req, res, next)
	{
		ninjas.insert(
		{
			name: req.body.name || unKnown,
			rank: req.body.rank,
			status: req.body.status || false
		}, 
		function(err, data)
		{
			if(err)
			{
				res.send({error: "database error"});
			}
			else
			{
				res.send(data);
			}
		});
	});

	app.put('/update_user/:name', function(req, res, next)
	{
		ninjas.update({name: req.params.name}, {$set: req.body},
		function(err, data)
		{
			if(err)
			{
				res.send({error: "database error"});
			}
			else
			{
				res.send(data);
			}
		});
	});

	app.delete('/delete_user/:name', function(req, res, next)
	{
		ninjas.findOneAndDelete({name: req.params.name}, function(err, data)
		{
			if(err)
			{
				res.send({error: "database error"});
			}
			else
			{
				res.send(data);
			}
		});
	});

//exporting this file so that it can be used at other places
	module.exports = app;