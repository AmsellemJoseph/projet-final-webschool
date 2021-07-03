import React, { useState, useEffect } from 'react';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Nav from '../Nav/Nav'
import './style.css';

const LoginSystem = () => {

    const [localLog, setLocalLog] = useState({ logged: false })
    useState(() => {
        const verifLog = () => {
            var ver = JSON.parse(localStorage.getItem('logged'));
            if (ver) {
                if (ver.logged == true || ver.logged == false) {
                    setLocalLog({ logged: ver.logged })
                }
            }
        }
        verifLog()
    }, [])

    return (
        <div className="container">
            <Nav />
            <Register />
            <Login />
        </div>
    )
}

export default LoginSystem