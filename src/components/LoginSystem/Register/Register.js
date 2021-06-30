import React, { useRef, useState } from 'react';
import axios from 'axios';
import Registering from './logic'
const sha1 = require('js-sha1')

const Register = () => {
    const [error, setError] = useState('');
    const inputs = useRef([]);

    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }


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
            return setError('Password too small, please use at least 6 characters')
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
        if(!mailSending.data.response){
            return setError("An error as occured, please try later")
        }
        const create = await Regist.createUser();
        if (!create.data.response) {
            return setError("An error as occured, please try later");
        }
        setError("Bien ajoute");
    }


    return (
        <div>
            <h1>REGISTRATION</h1>
            <p style={{ color: 'red' }}>{error}</p>
            <form
                onSubmit={handleSubmit}
                action="" method="post">
                <div>
                    <label htmlFor="username">Username</label>
                    <input ref={addInput} type="text" name="username" placeholder="Username" required />
                </div>

                <div>
                    <label htmlFor="pass1">Password</label>
                    <input ref={addInput} type="password" name="pass1" placeholder="Password" required />
                </div>

                <div>
                    <label htmlFor="pass2">Confirm Password</label>
                    <input ref={addInput} type="password" name="pass2" placeholder="Password" required />
                </div>

                <div>
                    <label htmlFor="firstname">FirstName</label>
                    <input ref={addInput} type="text" name="firstname" placeholder="FirstName" required />
                </div>

                <div>
                    <label htmlFor="lastname">LastName</label>
                    <input ref={addInput} type="text" name="lastname" placeholder="LastName" required />
                </div>

                <div>
                    <label htmlFor="mail">Mail</label>
                    <input ref={addInput} type="email" name="mail" placeholder="Mail" required />
                </div>

                <div>
                    <button type="submit">Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register