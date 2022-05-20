import React, {Component} from "react";
import { connect } from 'react-redux';
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../component/atoms/button";
import { withRouter } from 'react-router';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends Component{
    state = {
        email: '',
        password:''
    }

    handleChangeText = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleLoginSubmit = async () =>{
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if(res){
            console.log('Login success', res);
            localStorage.setItem('userData', JSON.stringify(res))
            alert('Login success');
            this.setState({
                email: '',
                password: ''
            });
            history.push('/dashboard');
        }else{
            console.log('Login failed, wrong password');
            alert('Login failed, wrong password');
        }
    }

    render(){
        return(
            <Router>
                <div className="cardRegister">
                    <h1 className="textRegister">Login Page</h1>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleLoginSubmit} title='Login' loading={this.props.isLoading}/>
                    <Link to="/register"  className="button1">Go to Register</Link>
                </div>
            </Router>
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(withRouter(Login));