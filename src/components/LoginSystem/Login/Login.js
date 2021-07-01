import React, { useState, useRef } from 'react';
import LoginLogic from './logic'
import { useSelector, useDispatch } from 'react-redux';
import "./login.css"
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import SwitchRoute from '../../Mainsite/Switch/SwitchRoute'

const Login = () => {

    const {showLogin,logged} = useSelector(state=>({
        ...state.loginReducer,
        ...state.userLoggedReducer
    }))

    const [error, setError] = useState("");
    const inputs = useRef([]);
    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const dispatch = useDispatch();

    const close = () => {
        dispatch({
            type: "CLOSEALL"
        })
    }
    const toggleReg = () => {
        dispatch({
            type: "TOGGLEREG"
        })
    }

    const log = ()=>{
        dispatch({
            type:"LOG"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Logger = new LoginLogic("http://localhost:2108/registration", inputs.current[0].value, inputs.current[1].value);
        const verifMail = await Logger.mailExists();
        if (verifMail.data.response) {
            inputs.current[0].value = "";
            return setError("This email address does not exist");
        }
        const connection = await Logger.connection();
        if (!connection.data.connection) {
            inputs.current[1].value = "";
            return setError("Bad password!");
        }
        const pending = await Logger.verifPending();
        console.log(pending.data.confirmed)
        if (!pending.data.confirmed) {
            return setError("Your account is not yet active, please click on the link you received in your mailbox.")
        }
        const info = await Logger.recupInfo();
        console.log(info.data[0]);

        log();


        setError("");
    }

    return (
        <div className={showLogin ? "container-log" : 'container-empty'}>
            <div onClick={close} className="overlay-log"></div>
            <div className="container-form-log">
                <h2>Login</h2>
                <p style={{ color: 'red' }}>{error}</p>
                <form className="form-log"
                    onSubmit={handleSubmit}
                    action="" method="post">

                    <div className="inputs-log">
                        {/* <label htmlFor="mail">Mail</label> */}
                        <input ref={addInput} type="email" name="mail" placeholder="Mail" required />
                    </div>

                    <div className="inputs-log">
                        {/* <label htmlFor="pass1">Password</label> */}
                        <input ref={addInput} type="password" name="pass1" placeholder="Password" required />
                    </div>

                    <div>
                        <button className="butlog" type="submit">Login</button>
                    </div>
                    <p onClick={toggleReg}>Not registered? Click here</p>
                </form>
            </div>
        </div>
    )
}

export default Login