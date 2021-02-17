import React, {Component} from 'react';
import axios from 'axios';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Postajob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            usertype:'',
            title:'',
            reqname:'',
            reqemail:'',
            maxnoofapplicants:null,
            maxnoofpositions:null,
            dateofposting:null,
            deadline:null,
            skillsreq:[],
            jobtype:'',
            duration:'',
            salaryperm:'',
            rating:'',
            newskill:'',
            deadlineyear:'',
            deadlinemonth:'',
            deadlineday:'',
            deadlinehour:'',
            deadlineminute:'',
        }
        this.onchangetitle=this.onchangetitle.bind(this);
        this.onchangemaxnoofapplicants=this.onchangemaxnoofapplicants.bind(this);
        this.onchangemaxnoofpositions=this.onchangemaxnoofpositions.bind(this);
        this.onchangedeadline=this.onchangedeadline.bind(this);
        this.onchangejobtype=this.onchangejobtype.bind(this);
        this.onchangeduration=this.onchangeduration.bind(this);
        this.onchangesalaryperm=this.onchangesalaryperm.bind(this);
        this.onchangerating=this.onchangerating.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
        this.onChangenewskill=this.onChangenewskill.bind(this);
        this.onaddskill=this.onaddskill.bind(this);
        this.onchangedeadlineyear=this.onchangedeadlineyear.bind(this);
        this.onchangedeadlinemonth=this.onchangedeadlinemonth.bind(this);
        this.onchangedeadlineday=this.onchangedeadlineday.bind(this);
        this.onchangedeadlinehour=this.onchangedeadlinehour.bind(this);
        this.onchangedeadlineminute=this.onchangedeadlineminute.bind(this);
    }
    onchangetitle(event){
        this.setState({title:event.target.value});
    }
    onchangemaxnoofapplicants(event){
        this.setState({maxnoofapplicants:event.target.value});
    }
    onchangemaxnoofpositions(event){
        this.setState({maxnoofpositions:event.target.value});
    }
    onchangedeadline(event){
        this.setState({deadline:event.target.value});
    }
    onchangejobtype(event){
        this.setState({jobtype:event.target.value});
    }
    onchangeduration(event){
        this.setState({duration:event.target.value});
    }
    onchangesalaryperm(event){
        this.setState({salaryperm:event.target.value});
    }
    onchangerating(event){
        this.setState({rating:event.target.value});
    }
    onchangedeadlineyear(event){
        this.setState({deadlineyear:event.target.value})
    }
    onchangedeadlinemonth(event){
        this.setState({deadlinemonth:event.target.value})
    }
    onchangedeadlineday(event){
        this.setState({deadlineday:event.target.value})
    }
    onchangedeadlinehour(event){
        this.setState({deadlinehour:event.target.value})
    }
    onchangedeadlineminute(event){
        this.setState({deadlineminute:event.target.value})
    }
    onsubmit(e){
        e.preventDefault();

        const newJob={
            title:this.state.title,
            reqname:this.state.name,
            reqemail:this.state.email,
            maxnoofapplicants:this.state.maxnoofapplicants,
            maxnoofpositions:this.state.maxnoofpositions,
            dateofposting:Date.now(),
            //deadline:this.state.deadline,
            skillsreq:this.state.skillsreq,
            jobtype:this.state.jobtype,
            duration:this.state.duration,
            salaryperm:this.state.salaryperm,
            rating:this.state.rating,
            deadlineyear:this.state.deadlineyear,
            deadlinemonth:this.state.deadlinemonth,
            deadlineday:this.state.deadlineday,
            deadlinehour:this.state.deadlinehour,
            deadlineminute:this.state.deadlineminute
        }
        console.log(newJob);
        axios.post('http://localhost:4000/user/addjob',newJob).then(
            res=> {
                if(res.data.val==1){
                    alert("okkkk");
                }
                else{
                    alert("nooo");
                }
            }
        )

    }

    onChangenewskill(event){
        this.setState({newskill:event.target.value});
    }
    onaddskill(e){
        e.preventDefault();
        console.log(this.state.newskill);
        const newlist=this.state.skillsreq.concat(this.state.newskill);
        this.setState(
            {skillsreq:newlist}
        )
    }

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        axios.post('http://localhost:4000/user/requiterhome', newUser)
             .then(res =>{
                if(res.data.val==1){
                    this.setState({
                        name: res.data.name,
                        usertype:res.data.usertype,
                        contact:res.data.contact,
                        bio:res.data.bio
                    });
                    
                }
            });

    }
    render() {
        return (
            <div>
                <form >
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onchangetitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum Number of Applicants </label>
                        <input type={Number} 
                               className="form-control" 
                               value={this.state.maxnoofapplicants}
                               onChange={this.onchangemaxnoofapplicants}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum Number of Positions </label>
                        <input type={Number} 
                               className="form-control" 
                               value={this.state.maxnoofpositions}
                               onChange={this.onchangemaxnoofpositions}
                               />
                    </div>

                    <div>
                        <label>Skills:</label>
                    {this.state.skillsreq.map((person, index) => (
                        <p key={index}>{person}   </p>
                        
                        ))}
                    </div>


                     <div className="form-group">
                       <input type="text" 
                              className="form-control" 
                              value={this.state.newskill}
                              onChange={this.onChangenewskill}
                              />  
                       </div>
                       <div>
                       <button  onClick={this.onaddskill} >Add Skill</button>
                       </div>


                    <div class="form-group" >
                        <label>Jobtype: </label>
                        <select class="form-control" id="jobtype" value={this.state.jobtype} onChange={this.onchangejobtype} >
                            <option >Full-time</option>
                            <option >Part-time</option>
                            <option>Work From Home</option>
                        </select>
                    </div>

                    <div class="form-group" >
                        <label>Duration(Months): </label>
                        <select class="form-control" id="duration" value={this.state.duration} onChange={this.onchangeduration} >
                            <option >0</option>
                            <option >1</option>
                            <option >2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Salary Per Month: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.salaryperm}
                               onChange={this.onchangesalaryperm}
                               />
                    </div>

                    <div class="form-group" >
                        <label>Rating: </label>
                        <select class="form-control" id="rating" value={this.state.rating} onChange={this.onchangerating} >
                            <option >0</option>
                            <option >1</option>
                            <option >2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <label>Deadline</label>
                    <div className="form-group">
                       <label>Year: </label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.deadlineyear}
                              onChange={this.onchangedeadlineyear}
                              />  
                   
                       <label>Month: </label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.deadlinemonth}
                              onChange={this.onchangedeadlinemonth}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Day: </label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.deadlineday}
                              onChange={this.onchangedeadlineday}
                              />  
                   
                       <label>Hour: </label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.deadlinehour}
                              onChange={this.onchangedeadlinehour}
                              />  
                   
                       <label>Minutes: </label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.deadlineminute}
                              onChange={this.onchangedeadlineminute}
                              />  
                   </div>
                
                    
                    <button onClick={this.onsubmit}>Add</button>
                    <br/><br/>
                </form>
                
           </div>
        )
    }
}