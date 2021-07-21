import React, { useState, useRef,useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ForgotLogic from './logic'
import CircularIndeterminate from '../../../utils/CircularIndeterminate'
const md5 = require('md5')
const axios = require('axios')

const Forgot = () => {

    const history = useHistory();

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { showForgot,loading } = useSelector(state => ({
        ...state.loginReducer,
        ...state.loadingReducer
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

    const load = ()=>{
        dispatch({
            type:"LOADING"
        })
    }
    const stopLoad = ()=>{
        dispatch({
            type:"LOADED"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        load()
        const Forgot = new ForgotLogic('http://localhost:2108/registration', inputs.current[0].value)
        const verifMail = await Forgot.mailExists();
        if (verifMail.data.response) {
            inputs.current[0].value = "";
            stopLoad();
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
            stopLoad()
            return setError("An error as occured, please try again later")
        }

        const mailSendingReset = await Forgot.mailSendingReset();
        if (!mailSendingReset.data.response) {
            stopLoad()
            return setError("An error has occurred, please try again later")
        }
        stopLoad()
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
                {loading?<CircularIndeterminate/>:null}
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