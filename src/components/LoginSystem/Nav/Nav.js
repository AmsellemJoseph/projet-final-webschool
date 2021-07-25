import React from "react";
import './nav.css'
import { useDispatch } from 'react-redux';

const Nav = () => {

    const dispatch = useDispatch();

    const showLog = () => {
        dispatch({
            type: "TOGGLELOGIN"
        })
    }
    const showReg = () => {
        dispatch({
            type: "TOGGLEREG"
        })
    }

    return (
        <div className="navbar">
            <button onClick={showLog}>Login</button>
            <button onClick={showReg}>Register</button>
        </div>
    )
}

export default Nav