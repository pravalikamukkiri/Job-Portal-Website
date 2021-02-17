var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Job=require("../models/Jobs");
const { application } = require("express");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.get("/jobsinfo",function(req,res) {
    Job.find(function(err,jobs){
        if(err){
            console.log(err);
        }
        else{
            res.json(jobs);
        }
    })
})
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        usertype:req.body.usertype,
        password:req.body.password,
        rating:req.body.rating,
        //skills:req.body.skills,
        date: req.body.date
    });
    let response={
        email:req.body.email,
        val:"",
        usertype:req.body.usertype,
    }
    
    let user = new User(req.body);
    User.findOne({ email: req.body.email }, function(err, users) {
        if (err)
            console.log(err);
        else {
            if (!users) {
                //Not found
                console.log("New user");
                user.save()
                    .then(user => {
                        response.val=1;
                        res.json(response);
                    })
                    .catch(err => {
                        response.val=2;
                        res.json(response);
                    });
            } else{
                response.val=0;
                res.json(response);
            }
        }
    });

});


// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let response={
        email:"",
        val:"",
        usertype:"",
    }
	// Find user by email
	User.findOne({ email,password }).then(user => {
		// Check if user email exists
		if (!user) {
            response.val=0;
            res.json(response);
            console.log(response);
        }
        else{
            response.val=1;
            response.email=email;
            response.usertype=user.usertype;
            res.json(response);
            console.log(response);
        }
	});
});

router.post("/applicanthome", (req, res) => {
    const email = req.body.email;
    let response={
        val:"",
        email:"",
        name:"",
        usertype:"",
        rating:"",
        skill:"",
        education:"",
    }
    User.findOne({ email}).then(user => {
        if(!user){
            console.log("not found");
            response.val=0;
            res.json(response);
            
        }
        else{
            console.log("found");
            response.val=1;
            response.email=user.email;
            response.name=user.name;
            response.usertype=user.usertype;
            response.rating=user.rating;
            response.skill=user.skills;
            response.education=user.education;
            res.json(response);
            
        }
        

    })

})

router.post("/requiterhome", (req, res) => {
    const email = req.body.email;
    let response={
        val:"",
        email:"",
        name:"",
        usertype:"",
        contact:"",
        bio:"",
    }
    User.findOne({ email}).then(user => {
        if(!user){
            console.log("not found");
            response.val=0;
            res.json(response);
            
        }
        else{
            console.log("found");
            response.val=1;
            response.email=user.email;
            response.name=user.name;
            response.usertype=user.usertype;
            response.contact=user.contact;
            response.bio=user.bio;
            res.json(response);
            
        }
        

    })

})

router.post("/editapplicant",(req, res) => {
    let response={
        val:"",
    }
    console.log(req);
    User.find({email: req.body.email}).then(
        user => {
            if(!user){

            }
            else{
                console.log(user);
                var query={email: req.body.email};
                var newvalues={name:req.body.name, rating:req.body.rating, skills:req.body.skills, education:req.body.education};
                User.updateOne(query,newvalues,
                    function(err){
                        if(err){
                            response.val=0;
                        }
                        else{
                            response.val=1;
                        }
                        res.json(response);
                    });
                console.log(user);
            }
        }
    )
})

router.post("/editrequiter",(req,res) =>{
    let response={
        val:"",
    }
    console.log(req);
    User.find({email: req.body.email}).then(
        user => {
            if(!user){

            }
            else{
                console.log(user);
                User.updateOne({email:req.body.email},{name:req.body.name, contact:req.body.contact,bio:req.body.bio},
                    function(err){
                        if(err){
                            response.val=0;
                        }
                        else{
                            response.val=1;
                        }
                        res.json(response);
                    })
            }
        }
    )

})


router.post("/addjob",(req,res)=>{
    const newJob = new Job({
        title:req.body.title,
        reqname:req.body.reqname,
        reqemail:req.body.reqemail,
        maxnoofapplicants:req.body.maxnoofapplicants,
        maxnoofpositions:req.body.maxnoofpositions,
        dateofposting:req.body.dateofposting,
        //deadline:req.body.deadline,
        skillsreq:req.body.skillsreq,
        jobtype:req.body.jobtype,
        duration:req.body.duration,
        salaryperm:req.body.salaryperm,
        rating:req.body.rating,
        deadlineyear:req.body.deadlineyear,
        deadlinemonth:req.body.deadlinemonth,
        deadlineday:req.body.deadlineday,
        deadlinehour:req.body.deadlinehour,
        deadlineminute:req.body.deadlineminute,

    })
    let response={
        val:"",
    }
    newJob.save()
        .then(job => {
            response.val=1;
            
           
            console.log(job);
            User.findOne({email: req.body.reqemail}).then(
                user =>{
                    if(!user){
                        console.log("usernotfound");
                    }
                    else{
                        //const aplist=[];
                        const aplist=user.jobsposted;
                        aplist.push(job);
                        User.updateOne({email:req.body.reqemail},{jobsposted: aplist},
                            function(err){
                                if(err){
                                    console.log("nope");
                                }
                                else{
                                    console.log("added");
                                }
                            })
                    }
                }
            )
            res.json(response);
            res.status(200).json(job);

        })
        .catch(err => {
            response.val=0;
            res.json(response);
            console.log(req);
            console.log(err);
            res.status(400).send(err);
        });

})

router.post("/applytoanewjob",(req,res) => {
    console.log("came");
    const jobid=req.body.jobid;
    const email=req.body.email;
    const sop=req.body.sop;
    const skill=req.body.skill;
    const education=req.body.education;
    const rating=req.body.rating;
    const name=req.body.name;
    const dateapplied=req.body.dateapplied;
    const dateofjoining=req.body.dateofjoining;
    let response={
        val:"",
    }
    console.log(jobid);
    Job.findOne({_id:jobid}).then(
        job=>{
            if(!job){
                console.log("error in applying for a job");
                response.val=0;
                res.json(response);

            }
            else{
                console.log(job);
                response.val=1;              
                const alist=job.applied;
                //const alist=[];
                const newapl={
                    email:'',
                    sop:'',
                    rating:'',
                    skill:null,
                    education:null,
                    name:'',
                    dateofjoining:null,
                    dateapplied:null,
                    status:'pending',
                }
                newapl.email=email;
                newapl.sop=sop;
                newapl.skill=skill,
                newapl.education=education,
                newapl.rating=rating,
                newapl.name=name,
                newapl.dateapplied=dateapplied,
                newapl.dateofjoining=dateofjoining,
                alist.push(newapl);
                console.log(alist);
                Job.updateOne({_id:jobid},{applied:alist},
                    function(err){
                    if(err){
                        response.val=0;
                    }
                    else{
                        response.val=1;
                        User.findOne({email: req.body.email}).then(
                            user =>{
                                if(!user){
                                    console.log("usernotfound");
                                }
                                else{
                                    //const aplist=[];
                                    const aplist=user.jobsapplied;
                                    aplist.push(job);
                                    const listids=user.appliedjobids;
                                    listids.push(job._id);
                                    User.updateOne({email:req.body.email},{jobsapplied: aplist,appliedjobids: listids},
                                        function(err){
                                            if(err){
                                                console.log("nope");
                                            }
                                            else{
                                                console.log("added");
                                            }
                                        })
                                }
                            }
                        )
                    }
                    res.json(response);
                });
                console.log(job);

                //res.json(response);
            }
        }
    )
})

router.post("/jobsapplied",(req,res) => {
    console.log("came");
    const email=req.body.email;
    let response={
        val:"",
        jobsapplied:[],
        appliedids:[],
        jobsposted:[],
    }
    User.findOne({email}).then(
        user => {
            if(!user){
                response.val=0;
                res.json(response);

            }
            else{
                response.val=1;
                response.jobsapplied=user.jobsapplied;
                response.appliedids=user.appliedjobids;
                response.jobsposted=user.jobsposted;
                res.json(response);
            }
        }
    )
})

router.post("/updatejobstatus",(req,res) => {
    console.log("came",req.body);
    const jobid=req.body.jobid;
    const email=req.body.email;
    const status=req.body.status;
    const dateofjoining=req.body.dateofjoining;
    let response={
        val:"",
    }
    console.log(jobid);
    Job.findOne({_id:jobid}).then(
        job=>{
            if(!job){
                console.log("error in applying for a job");
                response.val=0;
                res.json(response);

            }
            else{
                console.log(job);
                response.val=1;
                Job.updateOne({_id:jobid, "applied.email":email},{$set: {"applied.$.status":status}}).then(
                    ress=>{
                        console.log(ress);
                        console.log(job);
                    }
                    
                )
                Job.updateOne({_id:jobid, "applied.email":email},{$set: {"applied.$.dateofjoining":dateofjoining}}).then(
                    ress=>{
                        console.log(ress);
                        console.log(job);
                    }
                    
                )
                res.json(response);
            }
        }
    )
})



router.post("/jobinfotoedit",(req,res) =>{
    console.log("came for edit info");
    const jobid=req.body.jobid;
    let response={
        val:'',
        maxnoofapplicants:'',
        maxnoofpositions:'',
        deadlineyear:'',
        deadlinemonth:'',
        deadlineday:'',
        deadlinehour:'',
        deadlineminute:'',
    }
    Job.findOne({_id:jobid}).then(
         job =>{
        if(!job){
            response.val=0;
            res.json(response);
        }
        else{
            console.log(job);
            response.val=1;
            response.maxnoofapplicants=job.maxnoofapplicants;
            response.maxnoofpositions=job.maxnoofpositions;
            response.deadlineyear=job.deadlineyear;
            response.deadlinemonth=job.deadlinemonth;
            response.deadlineday=job.deadlineday;
            response.deadlinehour=job.deadlinehour;
            response.deadlineminute=job.deadlineminute;
            console.log(response);
            res.json(response);
        }
    })
})
router.post("/editingjob",(req,res) =>{
    const jobid=req.body.jobid;
    const maxnoofapplicants=req.body.maxnoofapplicants;
    console.log("editing");
    console.log(req.body);
    let response={
        val:"",
    }
    Job.findOne({_id:jobid}).then(
        job=>{
            if(!job){
                console.log("error in applying for a job");
                response.val=0;
                res.json(response);

            }
            else{
                console.log(job);
                response.val=1;
                Job.updateOne({_id:jobid},{maxnoofapplicants:maxnoofapplicants, 
                maxnoofpositions:req.body.maxnoofpositions,
                deadlineyear:req.body.deadlineyear,
                deadlinemonth:req.body.deadlinemonth,
                deadlineday:req.body.deadlineday,
                deadlinehour:req.body.deadlinehour,
                deadlineminute:req.body.deadlineminute,
            }).then(
                    ress=>{
                        if(!res){
                            console.log("error in updating");
                        }
                        else{
                            console.log("ok done up")
                        }
                    }
                    
                ).catch(
                    err=>{
                        console.log(err);
                    }
                )
                res.json(response);
            }
        }
    )

})
router.post("/deleteajob",(req,res) =>{
    const jobid=req.body.jobid;
    console.log("deleting");
    let response={
        val:"",
    }
    Job.findOne({_id:jobid}).then(
        job=>{
            if(!job){
                response.val=0;
                res.json(response);

            }
            else{
                response.val=1;
                Job.deleteOne(job,function(err, obj) {
                    if (err) throw err;
                    else 
                    {
                        response.val=2;
                        res.json(response);
                    }
                } )

            }
        }
    )
})
router.post("/deleteauser",(req,res) =>{
    const userid=req.body.userid;
    console.log("deleting");
    let response={
        val:"",
    }
    User.findOne({_id:userid}).then(
        job=>{
            if(!job){
                response.val=0;
                res.json(response);

            }
            else{
                response.val=1;
                User.deleteOne(job,function(err, obj) {
                    if (err) throw err;
                    else 
                    {
                        response.val=2;
                        res.json(response);
                    }
                } )

            }
        }
    )
})

module.exports = router;

