import React, { useState, useEffect } from 'react';
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

    // const [localLog, setLocalLog] = useState({ logged: false })
    // useState(() => {
    //     const verifLog = () => {
    //         var ver = JSON.parse(localStorage.getItem('logged'));
    //         if (ver) {
    //             if (ver.logged == true || ver.logged == false) {
    //                 setLocalLog({ logged: ver.logged })
    //             }
    //         }
    //     }
    //     verifLog()
    // }, [])

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