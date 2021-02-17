import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class ApplicantHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name:"",
            usertype:"",
            rating:"1",
            skill:[
            ],
            education:[
                {
                    name:"",
                    year:"",
                }
            ],
            newedname:"",
            newedyear:"",
            newskill:"",
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeraing=this.onChangeraing.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangenewskill=this.onChangenewskill.bind(this);
        this.onaddskill=this.onaddskill.bind(this);
        this.onChangeneweducationname=this.onChangeneweducationname.bind(this);
        this.onChangeneweducationyear=this.onChangeneweducationyear.bind(this);
        this.onaddeducation=this.onaddeducation.bind(this);
        
        
    }




    componentDidMount(){
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        axios.post('http://localhost:4000/user/applicanthome', newUser)
             .then(res =>{
                if(res.data.val==1){
                    console.log(res.data);
                    this.setState({
                        name: res.data.name,
                        usertype:res.data.usertype,
                        rating:res.data.rating,
                        skill:res.data.skill,
                        education:res.data.education
                    });
                    
                }
            });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangename(event){
        this.setState({name:event.target.value});
    }

    onChangeraing(event){
        this.setState({rating:event.target.value});
    }
    onChangenewskill(event){
        this.setState({newskill:event.target.value});
    }
    onaddskill(e){
        e.preventDefault();
        console.log(this.state.newskill);
        const newlist=this.state.skill.concat(this.state.newskill);
        this.setState(
            {skill:newlist}
        )
       //this.state.skill.push(this.state.newskill);
       //this.state.skill.push(e);
       //list=this.state.skill;
       //list.push(e);
       //this.setState({
        //   skill:list;
      // })

    }
    onChangeneweducationname(event){
        this.setState({newedname: event.target.value});
    }
    onChangeneweducationyear(event){
        this.setState({newedyear: event.target.value});
    }

    onaddeducation(e){
        e.preventDefault();
        const newlist1=this.state.education.concat({name:this.state.newedname, year:this.state.newedyear});
        this.setState({
            education:newlist1
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const User = {
            email: this.state.email,
            name: this.state.name,
            rating: this.state.rating,
            skills:this.state.skill,
            education:this.state.education
        }
        console.log(User);
        axios.post('http://localhost:4000/user/editapplicant', User)
             .then(res => {console.log(res.data);
                if(res.data.val==1){
                    alert("completed");
                }
                else{
                    alert("Login not completed");
                }
            });
    }

    render() {
        return(
            <div>

            
            <nav className="navbar navbar-expand-lg ">
                    <Link to="/applicanthome" className="navbar-brand">Profile</Link>
                    <div >
                        <ul className="navbar-nav mr-auto">
                            
                            <li className="navbar-item">
                                <Link to="/jobsapplicant" className="nav-link">Dashboard to view jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/jobsapplied" className="nav-link">Jobs applied</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        <h1><center>Welocme {this.state.name} </center> </h1>
        

        <form onSubmit={this.onSubmit}>
                   
                   <div className="form-group">
                       <label>Name: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.name}
                              onChange={this.onChangename}
                              />  
                   </div>

                   <div class="form-group" >
                        <label>Rating: </label>
                        <select class="form-control" id="rating" value={this.state.rating} onChange={this.onChangeraing} >
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                        </select>
                    </div>
                    

                    <div>
                        <label>Skills:</label>
                    {this.state.skill.map((person, index) => (
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

                       <div>
                        <label>Education:</label>
                    {this.state.education.map((person, index) => (
                        <p key={index}>{person.name} {person.year}</p>
                        ))}
                    </div>


                       <div className="form-group">
                           <label>Name of the institute</label>
                       <input type="text" 
                              //className="form-control" 
                              value={this.state.newedname}
                              onChange={this.onChangeneweducationname}
                              />
                              <label>Year</label>  
                        <input type="text" 
                              //className="form-control" 
                              value={this.state.newedyear}
                              onChange={this.onChangeneweducationyear}
                              />  

                            <button onClick={this.onaddeducation}>Add Education</button>

                       
                       </div>

                   
                       


                   
                   <div className="form-group">
                       <input type="submit" value="Submit" className="btn btn-primary"/>
                   </div>
               </form>

            </div>
        )
    }
}