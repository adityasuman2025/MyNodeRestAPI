var express = require('express');
var Ninja = require('../models/ninjas');

var app = express();

app.get('/all_users', function(req, res, next)
{
	Ninja.find({}).then(function(data)
	{
		res.send(data);
	});
});

app.get('/users', function(req, res, next)
{
	Ninja.find({name: req.query.name}).then(function(data)
	{
		res.send(data);
	});
});

app.post('/users', function(req, res, next)
{
	Ninja.create(req.body).then(function(data)
	{
		res.send({data});
	}).catch(next);
});

app.put('/users/:id', function(req, res, next)
{
	Ninja.findOneAndReplace({_id: req.params.id}, req.body).then(function(data)
	{
		console.log("success: done updation");
		res.send(data);
	}).catch(next);
});

app.delete('/users/:id', function(req, res, next)
{
	Ninja.deleteOne({_id: req.params.id}).then(function(data)
	{
		res.send({"success": "done deletion"});
	}).catch(next);
});


module.exports = app;