import React, {Component} from 'react';
import axios from 'axios';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Applytoajob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            jobid:null,
            sop:'',
            email:'',
            usertype:'',
            skill:[],
            rating:'',
            education:[],
        }
        this.onchangesop=this.onchangesop.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
    }

    componentDidMount() {
        const newUser = {
            jobid:localStorage.getItem("job"),
            email: localStorage.getItem("email"),
        }

        this.setState({
            email: newUser.email,
            jobid:newUser.jobid,
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
    onchangesop(event){
        this.setState({
            sop:event.target.value,
        })
    }
    onsubmit(e){
       // console.log("clicked button")
        e.preventDefault();
        const newjobapplication = {
            name:this.state.name,
            email:this.state.email,
            jobid:this.state.jobid,
            sop:this.state.sop,
            rating:this.state.rating,
            skill:this.state.skill,
            education:this.state.education,
            dateapplied:Date(),
            dateofjoining:Date(),

        }
        console.log(newjobapplication);
        axios.post('http://localhost:4000/user/applytoanewjob', newjobapplication).then(
            res => {if(res.data.val==1){
                console.log("done");
                alert("done");
                this.props.history.push("/jobsapplicant");
            }
            else{
                console.log("nooo");
                alert("failed to apply");
            }})


        this.setState({
            sop:'',

        })
    }
    render() {
        return (

            <div>


                <nav className="navbar navbar-expand-lg ">
                    <Link to="/applicanthome" className="navbar-brand">Profile</Link>
                    <div >
                        <ul className="navbar-nav mr-auto">
                            
                            <li className="navbar-item">
                                <Link to="/jobsapplicant" className="nav-link">Dashboard to view jobs</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <center>
                
                <h1 >Apply for this job </h1>
                

                </center>
                <form >

                    <div className="form-group">
                        <label>Sop: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.sop}
                               onChange={this.onchangesop}
                               />
                    </div>
                    <div>
                    <button onClick={this.onsubmit}>Apply</button>
                    </div>
                    </form >
               
           </div>
        )
    }
}