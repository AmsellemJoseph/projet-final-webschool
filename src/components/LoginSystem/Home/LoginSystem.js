import React from 'react';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Nav from '../Nav/Nav'
import './style.css';

const LoginSystem = ()=>{

    return(
    <div className="container">
        <Nav/>
        <Register/>
        <Login/>
    </div>)
}

export default LoginSystem