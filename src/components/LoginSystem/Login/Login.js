import React, { useState, useRef, useEffect } from 'react';
import LoginLogic from './logic'
import { useSelector, useDispatch } from 'react-redux';
import "./login.css"
import { BrowserRouter as Router, useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch({
            type: "DESTROY",
        })
        const verifLog = JSON.parse(localStorage.getItem('logged'));
    if (verifLog) {
        if (verifLog.logged == true) {
           return history.push('/accueil');
        }
    }

    }, [])


    const { showLogin, logged, admin } = useSelector(state => ({
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

    const userCookie = (user) => {
        dispatch({
            type: "CREATE",
            payload: user
        })
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("logged", JSON.stringify({ logged: true }));
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
        if (!pending.data.confirmed) {
            return setError("Your account is not yet active, please click on the link you received in your mailbox.")
        }
        const info = await Logger.recupInfo();
        if (info.data[0].confirmed) {
        }
        const user = {
            username: info.data[0].username,
            mail: info.data[0].mail,
            credit: info.data[0].credit,
            firstname: info.data[0].firstname,
            lastname: info.data[0].lastname,
        }
        if (info.data[0].admin == true) {
            localStorage.setItem('admin', JSON.stringify({ admin: true }));
            return history.push('/admin')
        }

        userCookie(user);
        setError("");
        return history.push('/accueil')
    }

    return (
        <Router>
            <div className={showLogin ? "container-log" : 'container-empty'}>
                <div onClick={close} className="overlay-log"></div>
                <div className="container-form-log">
                    <h2>Login</h2>
                    <p style={{ color: '#a035fd' }}>{error}</p>
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

                    </form>
                </div>

            </div>
        </Router>

    )
}

export default Login