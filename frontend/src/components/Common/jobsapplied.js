import React, {Component} from 'react';
import axios from 'axios';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';

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

export default class Jobsapplied extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            usertype:'',
            password:'',
            jobs: [],
            jobsappliedfor:[],
            newjob:null,
            statuss:'',
            appliedjobids:[],
            
        }
    }

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        // axios.post('http://localhost:4000/user/jobsapplied',newUser).then(
        //     res=> {
        //         if(res.data.val==1){
        //             //console.log(res.data);
        //             this.setState({
        //                 //jobsappliedfor:res.data.jobsapplied,
        //                 appliedjobids:res.data.appliedids,
        //             })
        //             axios.get('http://localhost:4000/user/jobsinfo').then(response => {
        //             this.setState({jobs: response.data,});
        //             response.data.forEach(job => {
        //                 if(res.data.appliedids.includes(job._id)){
        //                     //console.log(job._id);
        //                     const listl=this.state.jobsappliedfor.concat(job);
        //                     this.setState({jobsappliedfor:listl})
        //                 }
        //             }
        //              )
        //              })
        //         }
        //         else{
        //             }
        //     }
        // );
        axios.get('http://localhost:4000/user/jobsinfo').then(response => {
                    this.setState({jobs: response.data,});
                    response.data.map(job => {
                        job.applied.map(application => {
                            if(application.email==this.state.email){
                                job.status=application.status;
                                const listl=this.state.jobsappliedfor.concat(job);
                                this.setState({jobsappliedfor:listl})

                            }
                        })
                    })

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
                            <li className="navbar-item">
                                <Link to="/jobsapplied" className="nav-link">Jobs applied</Link>
                            </li>
                        </ul>
                    </div>
                </nav>


                <center>
                
                <h1 > Jobs applied {this.state.email}</h1>
                </center>

               

                
                <Grid container>
                    
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Duration</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Req name</TableCell>
                                            <TableCell>Status</TableCell>
                                            
                                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobsappliedfor.map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>                                         
                                            <TableCell>{job.duration} Months</TableCell>
                                            <TableCell>{job.salaryperm}</TableCell>
                                            <TableCell>{job.reqname}</TableCell>
                                            {
                                            job.applied.forEach(element => {
                                                //console.log(element.email);
                                                if(element.email==this.state.email){
                                                    //console.log("oooo");
                                                    console.log(element.status);
                                                    //<TableCell>ok</TableCell>
                                                    this.setState({
                                                        statuss:element.status
                                                    });
                                                    job.applied.length=job.applied.indexOf(element);
        
                                                }
                                            })
                                            }
                                            <TableCell>{job.status}</TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid> 


           </div>
        )
    }

}