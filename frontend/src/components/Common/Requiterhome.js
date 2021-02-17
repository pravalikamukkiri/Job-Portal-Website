import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class RequiterHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name:"",
            usertype:"",
            contact:"",
            bio:""
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangebio=this.onChangebio.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
    }



    componentDidMount(){
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

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangename(event){
        this.setState({name:event.target.value});
    }

    onChangecontact(event){
        this.setState({contact:event.target.value});
    }
    onChangebio(event){
        this.setState({bio:event.target.value});
    }
    onSubmit(e){
        e.preventDefault();

        const User = {
            email: this.state.email,
            name: this.state.name,
            contact:this.state.contact,
            bio:this.state.bio,
        }
        console.log(User);
        axios.post('http://localhost:4000/user/editrequiter', User)
             .then(res => {console.log(res.data);
                if(res.data.val==1){
                    alert("completed");
                }
                else{
                    alert("edit not completed");
                }
            });
    }




    

    render() {
        return(
            <div>

            
            <nav className="navbar navbar-expand-lg ">
                    <Link to="/requiterhome" className="navbar-brand">Profile</Link>
                    <div >
                        <ul className="navbar-nav mr-auto">
                            
                            <li className="navbar-item">
                                <Link to="/requiterdashboard" className="nav-link">Dashbord</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/postajob" className="nav-link">Post a job</Link>
                            </li>
                            <li>
                            <Link to="/jobsposted" className="nav-link">Jobs posted</Link>
                            </li>
                        </ul>
                    </div>
                </nav>


        <h1><center>Welocme {this.state.name} {this.state.email}</center> </h1>

        <form >
                <div className="form-group">
                       <label>Name: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.name}
                              onChange={this.onChangename}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Contact: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.contact}
                              onChange={this.onChangecontact}
                              />  
                   </div>

                   <div className="form-group">
                       <label>Bio: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.bio}
                              onChange={this.onChangebio}
                              />  
                   </div>

                   <div>
                       <button onClick={this.onSubmit}>Submit</button>
                   </div>
            
        </form>
        

        

            </div>
        )
    }
}