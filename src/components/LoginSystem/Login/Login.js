import React, { useState, useRef } from 'react';
import LoginLogic from './logic'
import { useSelector,useDispatch } from 'react-redux';
import "./style.css"

const Login = () => {

    const showLogin = useSelector(state=>state)

    const [error, setError] = useState("");
    const inputs = useRef([]);
    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
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
        setError("");
    }
    console.log(showLogin);

    return (
        <div className={showLogin.showLogin?"container-reg":'container-empty'}>
            <div className="overlay"></div>
            <div className="form">
                <h2>Login</h2>
                <p style={{ color: 'red' }}>{error}</p>
                <form
                    onSubmit={handleSubmit}
                    action="" method="post">

                    <div className="inputs-reg">
                        {/* <label htmlFor="mail">Mail</label> */}
                        <input ref={addInput} type="email" name="mail" placeholder="Mail" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="pass1">Password</label> */}
                        <input ref={addInput} type="password" name="pass1" placeholder="Password" required />
                    </div>

                    <div>
                        <button className="butReg" type="submit">Login</button>
                    </div>
                </form>
                <p>Not registered? Click here</p>
            </div>
        </div>
    )
}

export default Login