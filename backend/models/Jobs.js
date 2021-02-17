const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title:{
        type:String,
        required:true
    },
    reqname:{
        type:String,
        required:true
    },
    reqemail:{
        type:String,
        required:true
    },
    maxnoofapplicants:{
        type:Number,
        required:true,
    },
    maxnoofpositions:{
        type:Number,
        required:true
    },
    dateofposting:{
        type:Date,
        required:true
    },
    deadline:{
        type:String,
        required:false
    },
    skillsreq:{
        type:[],
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    salaryperm:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    applied:{
        type:[],
        required:false
    },
    deadlineyear:{
        type:String,
        required:false
    },
    deadlinemonth:{
        type:String,
        required:false
    },
    deadlineday:{
        type:String,
        required:false
    },
    deadlinehour:{
        type:String,
        required:false
    },
    deadlineminute:{
        type:String,
        required:false
    }

	
});

module.exports = Job = mongoose.model("Jobs", JobSchema);
