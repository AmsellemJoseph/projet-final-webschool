import React, { useState, useRef } from 'react';
// import { Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ForgotLogic from './logic'
const md5 = require('md5')
const axios = require('axios')

const Forgot = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { showForgot } = useSelector(state => ({
        ...state.loginReducer
    }))

    const dispatch = useDispatch();
    const inputs = useRef([])
    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const close = () => {
        dispatch({
            type: "CLOSEALL"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const Forgot = new ForgotLogic('http://localhost:2108/registration', inputs.current[0].value)
        const verifMail = await Forgot.mailExists();
        if (verifMail.data.response) {
            inputs.current[0].value = "";
            return setError("This email address does not exist");
        }


        const user = { mail: inputs.current[0].value }
        var token = md5(Date.now())
        localStorage.setItem("user", JSON.stringify(user))
        const flagToken = await axios.put('http://localhost:2108/registration/settoken', { params: { token, user } })
        if (flagToken) {
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("logged", JSON.stringify({ logged: true }));
        } else {
            return setError("An error as occured, please try again later")
        }

        const mailSendingReset = await Forgot.mailSendingReset();
        if (!mailSendingReset.data.response) {
            return setError("An error has occurred, please try again later")
        }
        setError("")
        return setSuccess("An email has been sent to you to reset your password")
    }

    return (
        // <Router>
        <div className={showForgot ? "container-log" : 'container-empty'}>
            <div onClick={close} className="overlay-log"></div>
            <div className="container-form-log">
                <h2>Forgot</h2>
                <p style={{ color: '#a035fd' }}>{error}</p>
                <p style={{ color: '#f3ef83' }}>{success}</p>
                <form className="form-log"
                    onSubmit={handleSubmit}
                    method="post">

                    <div className="inputs-log">
                        {/* <label htmlFor="mail">Mail</label> */}
                        <input ref={addInput} type="email" name="mail" placeholder="Mail" required />
                    </div>

                    <div>
                        <button className="butlog" type="submit">Send request</button>
                    </div>

                </form>
            </div>

        </div>
        // </Router>
    )
}

export default Forgot