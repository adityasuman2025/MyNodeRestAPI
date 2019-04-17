var express = require('express');
var Ninja = require('../models/ninjas');

var router = express.Router();

router.get('/hi', function(req, res, next)
{
	Ninja.find({name: req.query.name}).then(function(data)
	{
		res.send(data);
	});
});

router.post('/hi', function(req, res, next)
{
	Ninja.create(req.body).then(function(data)
	{
		res.send({data});
	}).catch(next);
});

router.put('/hi/:id', function(req, res, next)
{
	Ninja.findOneAndReplace({_id: req.params.id}, req.body).then(function(data)
	{
		console.log("success: done updation");
		res.send(data);
	}).catch(next);
});

router.delete('/hi/:id', function(req, res, next)
{
	Ninja.deleteOne({_id: req.params.id}).then(function(data)
	{
		res.send({"success": "done deletion"});
	}).catch(next);
});


module.exports = router;