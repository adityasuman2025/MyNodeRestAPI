var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//create ninja schema & model
	var ninjaSchema = new Schema({
		name: {
			type: String,
			required: [true, "Name is required"]
		},
		rank:{
			type: String,
		},
		status:{
			type: Boolean,
			default: false
		}
	});

	var Ninja = mongoose.model('ninja', ninjaSchema);

//exporting this file, so that it can be imported/required somewhere else
	module.exports = Ninja;