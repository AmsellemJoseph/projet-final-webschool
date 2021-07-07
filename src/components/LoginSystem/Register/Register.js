import React, { useRef, useState } from 'react';
import Registering from './logic'
import { useSelector, useDispatch } from 'react-redux';
import './register.css'

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
    const toggleLog = () => {
        dispatch({
            type: "TOGGLELOGIN"
        })
    }

    const { showRegister } = useSelector(state => ({
        ...state.loginReducer
    }))

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Regist = new Registering("http://localhost:2108/registration", inputs.current[0].value, inputs.current[1].value, inputs.current[2].value, inputs.current[3].value, inputs.current[4].value, inputs.current[5].value)
        if (!Regist.empty()) {
            return setError("Please fill all fields!");
        }
        if (!Regist.pass()) {
            inputs.current[1].value = "";
            inputs.current[2].value = "";
            return setError("Please confirm the same password!")
        }
        if (!Regist.verifPass()) {
            inputs.current[1].value = "";
            inputs.current[2].value = "";
            return setError('Please choose a password with a leat one lowercase character, one uppercase character, one digit and one special character and a least 8 characters long')
        }
        if (!Regist.verifRegexUsername()) {
            inputs.current[0].value = "";
            return setError("Please use letters and numbers only")
        }
        if (!Regist.verifRegexFirst()) {
            inputs.current[3].value = "";
            return setError('Please use letters, numbers or "-" only')
        }
        if (!Regist.verifRegexLast()) {
            inputs.current[4].value = "";
            return setError('Please use letters, numbers or "-" only')
        }
        if (!Regist.verifRegexMail()) {
            inputs.current[5].value = "";
            return setError('Please use a valid email address')
        }
        const verifUsernameExists = await Regist.usernameExists();
        if (!verifUsernameExists.data.response) {
            inputs.current[0].value = "";
            return setError("This username already exists, please choose another one.");
        }
        const verifMailExists = await Regist.mailExists()
        if (!verifMailExists.data.response) {
            inputs.current[5].value = "";
            return setError("This email adress already exists, please choose another one.");
        }
        const mailSending = await Regist.sendMail();
        if (!mailSending.data.response) {
            return setError("An error as occured, please try later")
        }
        const create = await Regist.createUser();
        if (!create.data.response) {
            return setError("An error as occured, please try later");
        }
        setError('')
        setSuccess("Registration taken into account, please check your mailbox to confirm your registration");
    }

    return (
        <div className={showRegister ? "container-reg" : "container-empty"}>
            <div className="overlay-reg" onClick={close}></div>
            <div className="container-form-reg">
                <h2>Registration</h2>
                <p style={{ color: '#a035fd' }}>{error}</p>
                <p style={{ color: '#f3ef83' }}>{success}</p>
                <form className="form-reg"
                    onSubmit={handleSubmit}
                    action="" method="post">
                    <div className="inputs-reg">
                        {/* <label htmlFor="username">Username</label> */}
                        <input ref={addInput} type="text" name="username" placeholder="Username" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="pass1">Password</label> */}
                        <input ref={addInput} type="password" name="pass1" placeholder="Password" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="pass2">Confirm Password</label> */}
                        <input ref={addInput} type="password" name="pass2" placeholder="Password" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="firstname">FirstName</label> */}
                        <input ref={addInput} type="text" name="firstname" placeholder="FirstName" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="lastname">LastName</label> */}
                        <input ref={addInput} type="text" name="lastname" placeholder="LastName" required />
                    </div>

                    <div className="inputs-reg">
                        {/* <label htmlFor="mail">Mail</label> */}
                        <input ref={addInput} type="email" name="mail" placeholder="Mail" required />
                    </div>

                    <div>
                        <button className="butReg" type="submit">Register</button>
                    </div>

                    <p onClick={toggleLog}>Already registered? Click here</p>
                </form>
            </div>
        </div>
    )
}

export default Register