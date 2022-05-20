import React, {Component} from "react";
import './Register.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../../component/atoms/button";
import {connect} from 'react-redux';
import { registerUserAPI } from "../../../config/redux/action";
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

class Register extends Component{
    state = {
        email: '',
        password:''
    }

    handleChangeText = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleRegisterSubmit = async () =>{
        const {email, password} = this.state;
        const res= await this.props.registerAPI({email, password}).catch(err=>err);
        if(res) {
            console.log('Register success');
            alert('Register success, lets login');
            this.setState({
                email: '',
                password: ''
            });
        }else{
            console.log('Register failed, email already used');
            alert('Register failed, email already used');
        }
    }

    render(){
        return(
            <Router>
                <div className="cardRegister">
                    <h1 className="textRegister">Register Page</h1>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleRegisterSubmit} title='Register' loading={this.props.isLoading}/>
                    <Link to="/login"  className="button2">Go to Login</Link>
                </div>
            </Router>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
});

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
});

export default connect(reduxState, reduxDispatch) (Register);
