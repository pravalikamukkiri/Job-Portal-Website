import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            usertype:'',
            password:''
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <div>
                <center>
                
                <h1 >Welcome to JobSearch.com</h1>
                </center>
           </div>
        )
    }
}