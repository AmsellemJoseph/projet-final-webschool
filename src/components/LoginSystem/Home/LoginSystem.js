import React from 'react';
import {useSelector} from 'react-redux';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Forgot from '../Forgot/Forgot'
import Nav from '../Nav/Nav'
import './style.css';

const LoginSystem = () => {

    const {showLogin, showRegister,showForgot} = useSelector(state => ({
        ...state.loginReducer
    }))


    return (
        <div className="container-main-logPage">
        <div className="container-navLog">
            <Nav />
            <Register />
            <Login />
            <Forgot />
        </div>
        {!showLogin&&!showRegister&&!showForgot?<div className="title-log">
            <h1>WELCOME TO KING OF GAMES!!!</h1>
            </div>:null}
        </div>
    )
}

export default LoginSystem