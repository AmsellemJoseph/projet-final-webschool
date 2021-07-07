import React, { useState, useRef, useEffect } from 'react';
import LoginLogic from './logic'
import { useSelector, useDispatch } from 'react-redux';
import "./login.css"
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import CircularIndeterminate from '../../../utils/CircularIndeterminate'
var md5 = require('md5');
const axios = require('axios')


const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        const tok = async () => {
        const tokenLocal = JSON.parse(localStorage.getItem('token'))
        const mail = JSON.parse(localStorage.getItem('user'))
        console.log(tokenLocal);
        const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
        console.log(tokTemp.data);
        if(tokTemp.data==1){
            console.log("oui")
            history.push('/accueil')
        }else{
            localStorage.setItem("token", JSON.stringify(""))
            localStorage.setItem("user", JSON.stringify(""))
            console.log('non')
        }
    }

    tok()
}, [])


    useEffect(() => {
        dispatch({
            type: "DESTROY",
        })

    }, [])


    const { showLogin, logged, admin,loading } = useSelector(state => ({
        ...state.loginReducer,
        ...state.userLoggedReducer,
        ...state.loadingReducer
    }))

    const [error, setError] = useState("");
    const inputs = useRef([]);
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
    const toggleReg = () => {
        dispatch({
            type: "TOGGLEREG"
        })
    }

    const toggleForgot = ()=>{
        dispatch({
            type:"TOGGLEFORGOT"
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

    const userCookie = async (user, token) => {
        dispatch({
            type: "CREATE",
            payload: user
        })
        var token = md5(Date.now())
        localStorage.setItem("user", JSON.stringify(user))
        const flagToken = await axios.put('http://localhost:2108/registration/settoken', { params: { token,user } })
        if(flagToken){
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("logged", JSON.stringify({ logged: true }));
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        load()
        const Logger = new LoginLogic("http://localhost:2108/registration", inputs.current[0].value, inputs.current[1].value);
        const verifMail = await Logger.mailExists();
        if (verifMail.data.response) {
            inputs.current[0].value = "";
            stopLoad()
            return setError("This email address does not exist");
        }
        const connection = await Logger.connection();
        if (!connection.data.connection) {
            inputs.current[1].value = "";
            stopLoad()
            return setError("Bad password!");
        }
        const pending = await Logger.verifPending();
        if (!pending.data.confirmed) {
            stopLoad()
            return setError("Your account is not yet active, please click on the link you received in your mailbox.")
        }
        const info = await Logger.recupInfo();
        if (info.data[0].confirmed) {
        }
        const user = {
            mail: info.data[0].mail,
        }
        if (info.data[0].admin == true) {
            localStorage.setItem('admin', JSON.stringify({ admin: true }));
            stopLoad()
            return history.push('/admin')
        }
        stopLoad()
        setError("");
        const flag = await userCookie(user);

        if(flag){
             history.push('/accueil')
        }

    }

    return (
        <Router>
            <div className={showLogin ? "container-log" : 'container-empty'}>
                <div onClick={close} className="overlay-log"></div>
                <div className="container-form-log">
                    <h2>Login</h2>
                    <p style={{ color: '#a035fd' }}>{error}</p>
                    {loading?<CircularIndeterminate/>:null}
                    <form className="form-log"
                        onSubmit={handleSubmit}
                        method="post">

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
                        <p onClick={toggleReg}>Not registered yet? Click here</p>
                        <p onClick={toggleForgot}>Forgot your password? Click here</p>

                    </form>
                </div>

            </div>
        </Router>

    )
}

export default Login