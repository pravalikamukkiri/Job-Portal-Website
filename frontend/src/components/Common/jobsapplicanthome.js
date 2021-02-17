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


class Joblistapplicant extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            appliedjobids:[],

            status:'',
            jobs: [],sortedjobs: [], sortName:true,sortsalaryicon:true,
            minsalary:'',
            maxsalary:'',
            jobscopy:[],
            searchvalue:'',
            sortdurationicon:true,
            sortratingicon:true,
            jobtype:'',
            duration:'1',
            noofopenapplications:0,
            jobsappliedfor:[],
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.dosomething=this.dosomething.bind(this);
        this.jobstatus=this.jobstatus.bind(this);
        this.sortbysalary=this.sortbysalary.bind(this);
        this.iconsalary=this.iconsalary.bind(this);
        this.onchangeminsalary=this.onchangeminsalary.bind(this);
        this.onchangemaxsalary=this.onchangemaxsalary.bind(this);
        this.submitsalary=this.submitsalary.bind(this);
        this.searchsubmit=this.searchsubmit.bind(this);
        this.onchangesearchvalue=this.onchangesearchvalue.bind(this);
        this.sortbyduration=this.sortbyduration.bind(this);
        this.iconduration=this.iconduration.bind(this);
        this.sortbyratig=this.sortbyratig.bind(this);
        this.iconrating=this.iconrating.bind(this);
        this.onchangejobtype=this.onchangejobtype.bind(this);
        this.filterjobtype=this.filterjobtype.bind(this);
        this.onchangeduration=this.onchangeduration.bind(this);
        this.filterbyduration=this.filterbyduration.bind(this);

    }
    self=this;

    componentDidMount() {
        const newUser = {
            email: localStorage.getItem("email"),
        }
        this.setState({
            email: newUser.email
        })
        axios.get('http://localhost:4000/user/jobsinfo')
             .then(response => {
                 this.setState({jobs: response.data, sortedjobs:response.data, jobscopy:response.data});
                 var arr=[];
                 var today=new Date();
                 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' '+today.getHours() + ":" + today.getMinutes() ;
                 //console.log(date);
                 
                 response.data.map((job,index) =>{
                       var deadlinedate=parseInt(job.deadlineyear)+'-'+parseInt(job.deadlinemonth)+'-'+parseInt(job.deadlineday)+' '+parseInt(job.deadlinehour)+":"+parseInt(job.deadlineminute);
                       //console.log(deadlinedate);
                       if(date<=deadlinedate){
                           arr.push(job);
                       }       
                 });
                console.log("oo",arr);
                this.setState({
                    jobs:arr,
                    jobscopy:arr,
                })
             })
             .catch(function(error) {
                 console.log(error);
             })
            axios.post('http://localhost:4000/user/jobsapplied',newUser).then(
                res=> {
                    if(res.data.val==1){
                        //console.log(res.data);
                        this.setState({
                            appliedjobids:res.data.appliedids,
                        })
                        axios.get('http://localhost:4000/user/jobsinfo').then(response => {
                            response.data.forEach(job => {
                            if(res.data.appliedids.includes(job._id)){
                                //console.log(job._id);
                                //const listl=this.state.jobsappliedfor.concat(job);
                                //this.setState({jobsappliedfor:listl})
                                job.applied.forEach(apl => {
                                    if(apl.email==this.state.email){
                                        console.log(apl.status);
                                        if(apl.status=="pending"){
                                            let x=this.state.noofopenapplications+1;
                                            this.setState({noofopenapplications:x})
                                            console.log(job.title,x)
                                        }
                                        
                                    }
                                })
                            }
                            }
                        )})
                    }
                    else{
                    }
                }
            );
           // console.log(this.state.appliedjobids);   
    }




    sortChange(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.jobs;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    sortbysalary(){
        var array = this.state.jobs;
        var flag = this.state.sortsalaryicon;
        //console.log(this.state.iconsalary);
        if(this.state.sortsalaryicon){
            array.sort((a,b) => (parseInt(a.salaryperm) > parseInt(b.salaryperm))? -1:1);
        }
        else{
            array.sort((a,b) => (parseInt(a.salaryperm) > parseInt(b.salaryperm))? 1:-1);
        }
        
        //console.log(array);

        this.setState({
            jobs:array,
            sortsalaryicon:!this.state.sortsalaryicon,
        })
       

    }
    sortbyduration(){
        var array = this.state.jobs;
        if(this.state.sortdurationicon){
            array.sort((a,b) => (parseInt(a.duration) > parseInt(b.duration))? -1:1);
        }
        else{
            array.sort((a,b) => (parseInt(a.duration) > parseInt(b.duration))? 1:-1);
        }
        
       // console.log(array);

        this.setState({
            jobs:array,
            sortdurationicon:!this.state.sortdurationicon,
        })
        
    }
    sortbyratig(){
        var array = this.state.jobs;
        if(this.state.sortratingicon){
            array.sort((a,b) => (parseInt(a.rating) > parseInt(b.rating))? -1:1);
        }
        else{
            array.sort((a,b) => (parseInt(a.rating) > parseInt(b.rating))? 1:-1);
        }
        
       // console.log(array);

        this.setState({
            jobs:array,
            sortratingicon:!this.state.sortratingicon,
        })
    }
    filterjobtype(){
      //  console.log(this.state.jobtype);
        var array=this.state.jobscopy;
        let result=[];
        for(let i=0;i<array.length;i++){
            if(array[i].jobtype==this.state.jobtype){
                result.push(array[i]);
            }
        }
      //  console.log(result);
        this.setState({jobs:result})
    }
    filterbyduration(){
        var array=this.state.jobscopy;
        let result=[];
        for(let i=0;i<array.length;i++){
            if(array[i].duration<this.state.duration){
                result.push(array[i]);
            }
        }
       // console.log(result);
        this.setState({jobs:result})
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
    iconduration(){
        if(this.state.sortdurationicon){
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
    iconsalary(){
        if(this.state.sortsalaryicon){
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

    renderIcon(){
        if(this.state.sortName){
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
    jobstatus(idjob,xx,a,b){
        console.log(xx,a,b);
        if(this.state.appliedjobids.includes(idjob)){
            return "applied"
        }
        else{
            if(xx>0 && a<b){

                return "apply"
            }
            else{
                return "filled"
            }
        }
    }
    dosomething(jobb){
        const jobss=this.jobstatus(jobb._id,jobb.maxnoofapplicants);
       console.log(jobss);
       if(jobss=="applied"){
           console.log("applied");
           return;
       }
       else if(this.state.noofopenapplications>=10){
           alert("You cannot apply to more than 10 jobs");
           return ;
       }
       else{
        console.log("clllll");
        localStorage.removeItem("job");
        localStorage.setItem("job",jobb._id);
        this.props.history.push({pathname:"/applytoajob",state:jobb}) ;
           
       }
        
    }
    statusbutton(){
        return <button>ok</button>

    }
    onchangemaxsalary(event){
        this.setState({maxsalary:event.target.value})
    }
    onchangeminsalary(event){
        this.setState({minsalary:event.target.value})
    }
    submitsalary(e){
        var array = this.state.jobscopy;
        let result=[];
        for(let i=0;i<array.length;i++){
            if(parseInt(array[i].salaryperm)<=parseInt(this.state.maxsalary ) && parseInt(array[i].salaryperm)>=parseInt(this.state.minsalary)){
                result.push(array[i]);

            }
        }
        console.log(result);
        this.setState({jobs:result});
        

    }
    onchangesearchvalue(event){
        this.setState({searchvalue:event.target.value})
    }
    searchsubmit(e){
        console.log(this.state.noofopenapplications);
        console.log(this.state.searchvalue);
        var array=this.state.jobscopy;
        let result=[];
        for(let i=0;i<array.length;i++){
            if(array[i].title.includes(this.state.searchvalue)){
                result.push(array[i]);
            }
        }
       // console.log(result);
        this.setState({jobs:result})
        
    }
    onchangejobtype(event){
        this.setState({jobtype:event.target.value});

    }
    onchangeduration(event){
        this.setState({duration:event.target.value});
    }
    acceptedpeoplenum(job){
        let x=0;
        job.applied.forEach(application => {
            if(application.status=="accepted"){
                x+=1;
            }
        })
        return x;
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
                <div>
                    <h1>{this.state.email}</h1>
                </div>


                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search " 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                            onChange={this.onchangesearchvalue}
                            onClick={()=>{this.searchsubmit()}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem >
                                <form  >
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} onChange={this.onchangeminsalary} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} onChange={this.onchangemaxsalary}/>
                                    <input type="button" value="submit" onClick={() => {this.submitsalary()}}></input><br/><br/>
                                    <label>Filter type</label>
                                    <div class="form-group" >
                                    
                                        <select class="form-control" id="jobtype" value={this.state.jobtype} onChange={this.onchangejobtype} >
                                        <option >Full-time</option>
                                        <option >Part-time</option>
                                        <option>Work From Home</option>
                                        </select>
                                    </div>
                                    <input type="button" value="submit" onClick={() => {this.filterjobtype()}}></input>
                                    <div class="form-group" >
                                        <label>Duration(Months): </label>
                                        <select class="form-control" id="duration" value={this.state.duration} onChange={this.onchangeduration} >
                                        <option >1</option>
                                        <option >2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        </select>
                                    </div>
                                    <input type="button" value="submit" onClick={() => {this.filterbyduration()}}></input>
                                </form>                                                               
                            </ListItem>
                            <Divider />
            
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        
                                            <TableCell>Title</TableCell>
                                            <TableCell>Requiter name</TableCell>
                                            <TableCell> <Button onClick={this.sortbyratig}>{this.iconrating()}</Button>Rating</TableCell>
                                            <TableCell><Button onClick={this.sortbyduration}>{this.iconduration()}</Button>Duration</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell><Button onClick={this.sortbysalary}>{this.iconsalary()}</Button>Salary</TableCell>
                                            <TableCell>Deadline</TableCell>
                                            
                                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job,ind) => (
                                        <TableRow key={ind}>
                                            
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.reqname}</TableCell>
                                            <TableCell>{job.rating}</TableCell>
                                            <TableCell>{job.duration} Months</TableCell>
                                            <TableCell>{job.jobtype}</TableCell>
                                            <TableCell>{job.salaryperm}</TableCell>
                                            <TableCell>{job.deadlineyear}-{job.deadlinemonth}-{job.deadlineday}  {job.deadlinehour}:{job.deadlineminute}</TableCell>
                                             <TableCell><form onSubmit={()=>{
                                                 console.log("clicked")
                                             }}>
                                                 {
                                                    
                                                 }
                                                 <input type="button"  value={this.jobstatus(job._id,job.maxnoofapplicants,this.acceptedpeoplenum(job),job.maxnoofpositions)}
                                                 onClick={()=> {this.dosomething(job)}} 
                                                 
                                             ></input></form></TableCell>
                                             


                                             
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

export default Joblistapplicant;