import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            usertype: 'applicant',
            password: '',
            rating:'',
            date:null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value});
    }
    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            usertype: this.state.usertype,
            password: this.state.password,
            rating:'1',
            date: Date.now()
        }
        axios.post('http://localhost:4000/user/register', newUser)
        .then(res => {
            console.log(res.data);
            if(res.data.val==0){
                alert("useremail already exists")
            }
            else if(res.data.val==1){
                alert("done");
                localStorage.removeItem("email");
                localStorage.setItem("email",res.data.email);
                if(res.data.usertype=="applicant"){
                    {this.props.history.push("/applicanthome")}; 
                }
                else{
                    {this.props.history.push("/requiterhome")};                    }
            }
            else{
                alert("failed to register");
            }
        })
        ;



        this.setState({
            name: '',
            email: '',
            usertype: 'applicant',
            password: '',
            rating:'',
            date:null
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div class="form-group" >
                        <label>Usertype: </label>
                        <select class="form-control" id="usertype" value={this.state.usertype} onChange={this.onChangeUsertype} >
                            <option >applicant</option>
                            <option >Requiter</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>pass: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}