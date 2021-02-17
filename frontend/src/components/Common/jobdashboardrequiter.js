import React, {Component} from 'react';
import axios from 'axios';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

export default class Jobdashboardreq extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            jobid:'',
            usertype:'',
            password:'',
            jobsposted:[],
            jobs:[],
            jobsupdated:[],
            applications:[],
            sortratingicon:true,
            sortnamesicon:true,
            sortdateicon:true,
            peopleaccepted:0,
            maxnoofpositions:'',
        }
       // this.findjob=this.findjob.bind(this);
       this.acceptbuttonstatus=this.acceptbuttonstatus.bind(this);
       this.buttonsubmit=this.buttonsubmit.bind(this);
       this.sortbyratig=this.sortbyratig.bind(this);
        this.iconrating=this.iconrating.bind(this);
        this.sortbyname=this.sortbyname.bind(this);
        this.iconname=this.iconname.bind(this);
        this.sortbydate=this.sortbydate.bind(this);
        this.icondate=this.icondate.bind(this);

    }

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        const newjob = {
            jobid: localStorage.getItem("job"),
        }
        this.setState({
            jobid:newjob.jobid
        })
        console.log(newjob);
        axios.get('http://localhost:4000/user/jobsinfo')
        .then(response => {
            console.log(response.data)
            this.setState({jobs: response.data,});
            response.data.forEach(job => {
                if(job._id==this.state.jobid){
                const newl=this.state.jobsupdated.concat(job);
                this.setState({jobsupdated:newl})
                this.setState({maxnoofpositions:job.maxnoofpositions})
                job.applied.forEach(application =>{
                    if(application.status=="pending"){
                        //console.log(application);
                        const ap=application;
                        ap.jobid=job._id;
                        //console.log(ap);
                        const newl=this.state.applications.concat(ap);
                        this.setState({applications:newl})

                    }
                    if(application.status=="accepted"){
                        let x=this.state.peopleaccepted+1;
                        this.setState({peopleaccepted:x})
                    }
                })
                console.log("ooooooooo",this.state.peopleaccepted,this.state.maxnoofpositions)
                if(this.state.peopleaccepted==this.state.maxnoofpositions){
                    job.applied.forEach(application =>{
                        if(application.status=="pending"){
                            this.buttonsubmit(this.state.jobid,"rejected",application.email)}

                        }
                    )
                }

                };
                
            })
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    acceptbuttonstatus(status){
        if(status=="pending"){
            return "";
        }
        else{
            return "true";
        }

    }
    buttonsubmit(id,st,emaild){

        const newapplication={
            jobid:id,
            email:emaild,
            status:st,
            dateofjoining:Date(),
        }
        console.log(newapplication);
        axios.post('http://localhost:4000/user/updatejobstatus', newapplication).then(
            res => {
                console.log(res);
                if(res.data.val==1){
                console.log("done");
                //alert("done");
                //this.props.history.push("/jobsapplicant");
            }
            else{
                console.log("nooo");
                //alert("failed to apply");
            }})
        console.log(this.state.peopleaccepted);
    }
    iconrating(){
        if(this.state.sortratingicon){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )  

        }
    }
    iconname(){
        if(this.state.sortnamesicon){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )  

        }
    }
    icondate(){
        if(this.state.sortdateicon){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )  

        }
    }
    sortbyratig(){
        console.log(this.state.peopleaccepted,this.state.maxnoofpositions);
        var array = this.state.applications;
        if(this.state.sortratingicon){
            array.sort((a,b) => (parseInt(a.rating) > parseInt(b.rating))? -1:1);
        }
        else{
            array.sort((a,b) => (parseInt(a.rating) > parseInt(b.rating))? 1:-1);
        }
        
        console.log(array);

        this.setState({
            applications:array,
            sortratingicon:!this.state.sortratingicon,
        })
    }
    sortbyname(){
        //console.log(Date(Date.now()))
        var array = this.state.applications;
        if(this.state.sortnamesicon){
            array.sort((a,b) => (a.name > b.name)? -1:1);
        }
        else{
            array.sort((a,b) => (a.name > b.name)? 1:-1);
        }
        
        console.log(array);

        this.setState({
            applications:array,
            sortnamesicon:!this.state.sortnamesicon,
        })
    }
    sortbydate(){
        var array = this.state.applications;
        if(this.state.sortdateicon){
            array.sort((a,b) => (a.dateapplied > b.dateapplied)? -1:1);
        }
        else{
            array.sort((a,b) => (a.dateapplied > b.dateapplied)? 1:-1);
        }
        
        console.log(array);

        this.setState({
            applications:array,
            sortdateicon:!this.state.sortdateicon,
        })

    }
    render() {
        return (
            <div>
                <center>
                
                <h1 >Welcome to JobSearch.com {this.state.email}</h1>
                </center>
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
                <Grid >
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                <TableRow>
                                            
                                            <TableCell><Button onClick={this.sortbyname}>{this.iconname()}</Button>name</TableCell>
                                            <TableCell>sop</TableCell>
                                            <TableCell>skills</TableCell>
                                            
                                            <TableCell><Button onClick={this.sortbyratig}>{this.iconrating()}</Button>Rating</TableCell>
                                            <TableCell>Education</TableCell>
                                            <TableCell><Button onClick={this.sortbydate}>{this.icondate()}</Button>Date applied</TableCell>
                                            <TableCell>Status</TableCell>
                                            
                                    </TableRow>
                                   
                                </TableHead>
                                <TableBody>
                                    {/* {this.state.jobsupdated.map((job,ind) => (
                                        job.applied.map((application,index) => (
                                            <TableRow key={index} hidden={this.acceptbuttonstatus(application.status)} >
                                                <TableCell>{application.name}</TableCell>
                                                <TableCell>{application.sop}</TableCell>
                                                <TableCell>{application.skill}</TableCell>                                             
                                                <TableCell>{application.rating}</TableCell>                        
                                                <TableCell>
                                                    <input type="button" value="accept" hidden={this.acceptbuttonstatus(application.status)} 
                                                    onClick={()=> {this.buttonsubmit(job._id,"accepted",application.email)}}/>
                                                </TableCell>
                                                <TableCell>
                                                    <input type="button" value="reject" hidden={this.acceptbuttonstatus(application.status)}
                                                    onClick={()=> {this.buttonsubmit(job._id,"rejected",application.email)}}/>
                                                </TableCell>
                                                
                                            </TableRow>
                                        ))
                                ))} */}
                                {
                                    this.state.applications.map(( apl,indx) => (
                                        <TableRow>
                                            {/* {console.log(apl)} */}
                                            <TableCell>{apl.name}</TableCell>
                                            <TableCell>{apl.sop}</TableCell>
                                            <TableCell>{apl.skill.map((s,idd) => (
                                                <p>{s}</p>
                                            ))}</TableCell>
                                            <TableCell>{apl.rating}</TableCell>
                                            <TableCell>{apl.education.map((ed,idx) =>(
                                                <p>{ed.name}-{ed.year}</p>
                                            ))}</TableCell>
                                            <TableCell>{apl.dateapplied}</TableCell>
                                            <TableCell>{apl.status}</TableCell>
                                            
                                            <TableCell>
                                                    <input type="button" value="accept" hidden={this.acceptbuttonstatus(apl.status)} 
                                                    onClick={()=> {this.buttonsubmit(apl.jobid,"accepted",apl.email)}}/>
                                                </TableCell>
                                                <TableCell>
                                                    <input type="button" value="reject" hidden={this.acceptbuttonstatus(apl.status)}
                                                    onClick={()=> {this.buttonsubmit(apl.jobid,"rejected",apl.email)}}/>
                                                </TableCell>
                                        </TableRow>
                                    ))
                                }
                                
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    


           </div>
        )
    }
}