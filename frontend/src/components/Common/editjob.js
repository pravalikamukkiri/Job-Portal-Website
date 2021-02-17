import React, {Component} from 'react';
import axios from 'axios';

export default class Editjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobid:'',
            maxnoofapplicants:'',
            maxnoofpositions:'',
            deadlineyear:'',
            deadlinemonth:'',
            deadlineday:'',
            deadlinehour:'',
            deadlineminute:'',
        }
        this.onchangemaxnoofapplicants=this.onchangemaxnoofapplicants.bind(this);
        this.onchangemaxnoofpositions=this.onchangemaxnoofpositions.bind(this);
        this.onchangedeadlineyear=this.onchangedeadlineyear.bind(this);
        this.onchangedeadlinemonth=this.onchangedeadlinemonth.bind(this);
        this.onchangedeadlineday=this.onchangedeadlineday.bind(this);
        this.onchangedeadlinehour=this.onchangedeadlinehour.bind(this);
        this.onchangedeadlineminute=this.onchangedeadlineminute.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
    }
    onchangemaxnoofapplicants(event){
        this.setState({maxnoofapplicants:event.target.value})
    }
    onchangemaxnoofpositions(event){
        this.setState({maxnoofpositions:event.target.value})
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
    onSubmit(e){
        console.log("ok")
        const newjob={
            jobid:this.state.jobid,
            maxnoofapplicants:this.state.maxnoofapplicants,
            maxnoofpositions:this.state.maxnoofpositions,
            deadlineyear:this.state.deadlineyear,
            deadlinemonth:this.state.deadlinemonth,
            deadlineday:this.state.deadlineday,
            deadlinehour:this.state.deadlinehour,
            deadlineminute:this.state.deadlineminute
            
        }
        console.log(newjob);
        axios.post('http://localhost:4000/user/editingjob', newjob).then(
            res => {if(res.data.val==1){
                console.log("done");

            }
            else{
                console.log("nooo");
            }})


    }

    componentDidMount() {
        const newjob={
            jobid:localStorage.getItem("job")
        }
        this.setState({jobid:newjob.jobid})
        axios.post('http://localhost:4000/user/jobinfotoedit',newjob).then(
            res => {
                console.log(res.data);
                if(res.data.val==1){
                    this.setState({
                        maxnoofapplicants:res.data.maxnoofapplicants,
                        maxnoofpositions:res.data.maxnoofpositions,
                        deadlineyear:res.data.deadlineyear,
                        deadlinemonth:res.data.deadlinemonth,
                        deadlineday:res.data.deadlineday,
                        deadlinehour:res.data.deadlinehour,
                        deadlineminute:res.data.deadlineminute,
                    })
                }
            })

    }
    render() {
        return (
            <div>
                <center>               
                <h1 >Edit job</h1>
                </center>
                <div className="form-group">
                       <label>Max no of applicants: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.maxnoofapplicants}
                              onChange={this.onchangemaxnoofapplicants}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Max no of positions: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.maxnoofpositions}
                              onChange={this.onchangemaxnoofpositions}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Year: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.deadlineyear}
                              onChange={this.onchangedeadlineyear}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Month: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.deadlinemonth}
                              onChange={this.onchangedeadlinemonth}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Day: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.deadlineday}
                              onChange={this.onchangedeadlineday}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Hour: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.deadlinehour}
                              onChange={this.onchangedeadlinehour}
                              />  
                   </div>
                   <div className="form-group">
                       <label>Minutes: </label>
                       <input type="text" 
                              className="form-control" 
                              value={this.state.deadlineminute}
                              onChange={this.onchangedeadlineminute}
                              />  
                   </div>
                   


                   


                   <div>
                       <button onClick={this.onSubmit}>Submit</button>
                   </div>


           </div>
        )
    }
}