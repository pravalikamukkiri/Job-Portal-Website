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

export default class Requiterdashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            usertype:'',
            password:'',
            jobsposted:[],
            jobs:[],
            jobsupdated:[],
            applications:[],
        }
       // this.findjob=this.findjob.bind(this);
       this.acceptbuttonstatus=this.acceptbuttonstatus.bind(this);
       this.buttonsubmit=this.buttonsubmit.bind(this);
    }

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        axios.get('http://localhost:4000/user/jobsinfo')
        .then(response => {
            this.setState({jobs: response.data,});
            response.data.forEach(job => {
                if(job.reqemail==this.state.email){
                const newl=this.state.jobsupdated.concat(job);
                this.setState({jobsupdated:newl})}

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
    acceptbuttonstatusnew(status){
        if(status=="accepted"){
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
            status:st
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
                <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                <TableRow>
                                            
                                            <TableCell>Name</TableCell>
                                            {/* <TableCell>sop</TableCell> */}
                                            <TableCell>Job type</TableCell>
                                            <TableCell>Job title</TableCell>
                                            <TableCell>Date of joining</TableCell>
                                    </TableRow>
                                   
                                </TableHead>
                                <TableBody>
                                    {this.state.jobsupdated.map((job,ind) => (
                                        job.applied.map((application,index) => (
                                            
                                            <TableRow key={index} hidden={this.acceptbuttonstatusnew(application.status)}>
                                                
                                                <TableCell>{application.name}</TableCell>
                                                {/* <TableCell>{application.sop}</TableCell> */}
                                                <TableCell>{job.jobtype}</TableCell>
                                                <TableCell>{job.title}</TableCell>
                                                <TableCell>{application.dateofjoining}</TableCell>
                                                
    
                                                
                                                
                                            </TableRow>
                                        ))
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    


           </div>
        )
    }
}