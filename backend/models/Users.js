const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	usertype:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	rating:{
		type:String,
		required:false,
	},
	skills:{
		type:[],
		required:false,
	},
	education:{
		type:[],
		required:false
	},
	contact:{
		type:String,
		required:false
	},
	bio:{
		type:String,
		required:false

	},
	jobsposted:{
		type:[],
		required:false,
	},
	jobsapplied:{
		type:[],
		required:false
	},
	appliedjobids:{
		type:[],
		required:false
	}
	
});

module.exports = User = mongoose.model("Users", UserSchema);
