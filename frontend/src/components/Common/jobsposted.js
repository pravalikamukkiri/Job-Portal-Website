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

export default class Jobsposted extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            usertype:'',
            password:'',
            jobs:[],
            jobsposted:[],
            jobsupdated:[],
            newjob:null,
        }
    }

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        axios.get('http://localhost:4000/user/jobsinfo').then(response => {
                    this.setState({jobs: response.data,});
                    var today=new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' '+today.getHours() + ":" + today.getMinutes() ;
                    response.data.forEach(job => {
                        if(job.reqemail==this.state.email){
                            var deadlinedate=parseInt(job.deadlineyear)+'-'+parseInt(job.deadlinemonth)+'-'+parseInt(job.deadlineday)+' '+parseInt(job.deadlinehour)+":"+parseInt(job.deadlineminute);
                            //console.log(job._id);
                            //const listl=this.state.jobsposted.concat(job);
                            //this.setState({jobsposted:listl})
                            if(date<=deadlinedate){
                                const listl=this.state.jobsposted.concat(job);
                                this.setState({jobsposted:listl})
                                
                            }
                        }
                    }
                     )
                     })




    }
    deletejob(job_id){
        const newjob={
            jobid:job_id
        }
        axios.post('http://localhost:4000/user/deleteajob',newjob).then(
            res=> {
                console.log(res.data)
            }
        );

    }
    render() {
        return (
            <div>
                <center>
                
                <h1 >welcome {this.state.email}</h1>
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
                                            
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of posting</TableCell>
                                            <TableCell>Number of applicants</TableCell>
                                            <TableCell>Max no of positions</TableCell>
                                            <TableCell>Deadline</TableCell>
                                            
                                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                       // console.log(this.state.jobsposted),
                                    this.state.jobsposted.map((job,ind) => (
                                        
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.dateofposting}</TableCell>
                                            <TableCell>{job.applied.length}</TableCell>
                                            <TableCell>{job.maxnoofpositions}</TableCell>
                                            
                                            <TableCell><button onClick={() =>{
                                                //console.log("ok");
                                                localStorage.removeItem("job");
                                                localStorage.setItem("job",job._id);
                                                this.props.history.push("/editjob") ;
                                            }}>edit</button></TableCell>
                                            <TableCell>
                                                <button onClick={() =>{
                                                    this.deletejob(job._id);
                                                }}>delete</button>
                                            </TableCell>
                                            <TableCell>
                                            <button onClick={() =>{
                                                    console.log("clicked");
                                                    localStorage.removeItem("job");
                                                    localStorage.setItem("job",job._id);
                                                    this.props.history.push("/jobdashboardreq") ;

                                                }}>view applications</button>

                                            </TableCell>
                                             

                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>               



           </div>
        )
    }
}