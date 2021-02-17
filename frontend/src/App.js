import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import Login from './components/Common/Login'
import ApplicantHome from './components/Common/ApplicantHome';
import RequiterHome from './components/Common/Requiterhome';
import Postajob from './components/Common/postajob';
import JobList from './components/Users/Joblists';
import JobListapplicant from './components/Common/jobsapplicanthome';
import Applytoajob from './components/Common/applytoajob';
import Jobsapplied from './components/Common/jobsapplied';
import Requiterdashboard from './components/Common/requiterdashboard';
import Jobsposted from './components/Common/jobsposted';
import Editjob from './components/Common/editjob';
import Jobdashboardreq from './components/Common/jobdashboardrequiter';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/login" component={Login}/>
        <Route path="/applicanthome" component={ApplicantHome}/>
        <Route path="/requiterhome" component={RequiterHome}/>
        <Route path="/postajob" component={Postajob}/>
        <Route path="/jobs" component={JobList}/>
        <Route path="/jobsapplicant" component={JobListapplicant}/>
        <Route path="/applytoajob" component={Applytoajob}/>
        <Route path="/jobsapplied" component={Jobsapplied}/>
        <Route path="/requiterdashboard" component={Requiterdashboard}/>
        <Route path="/jobsposted" component={Jobsposted}/>
        <Route path="/editjob" component={Editjob}/>
        <Route path="/jobdashboardreq" component={Jobdashboardreq}/>
      </div>
    </Router>
  );
}

export default App;
