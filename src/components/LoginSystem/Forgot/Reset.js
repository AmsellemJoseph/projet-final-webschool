import React, { useState, useRef,useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import './reset.css'
import ResetPassword from './logicReset'
const axios = require('axios')

const Reset = () => {

    const history = useHistory();
    const [error, setError] = useState('');
    const [success, setSuccess]=useState('');

    const inputs = useRef([]);
    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const mailCredit = mail.mail
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mail = JSON.parse(localStorage.getItem('user'))
        const Reset = new ResetPassword("http://localhost:2108/registration",mail,inputs.current[0].value,inputs.current[1].value)
        const verifPass = Reset.verifPass()
        if(!verifPass){
            return setError("Please confirm the same password!")
        }
        const verifPassStrong = Reset.verifPassStrong();
        if(!verifPassStrong){
            return setError('Please choose a password with a leat one lowercase character, one uppercase character, one digit and one special character and a least 8 characters long')
        }
        const res = await Reset.resetingPassword();
        if(!res){
           return setError('An error as occured,please try again later')
        }
        setError("")
        setSuccess('Password successfully updated');
        setTimeout(() => {
            return history.push('/')
        
        }, 5000);
    }

    return (
        <div className="container-main-resPage">
            <div className="container-res">
                <div className="overlay-res"></div>
                <div className="container-form-res">
                    <h2>Reset</h2>
                    <p style={{ color: '#a035fd' }}>{error}</p>
                    <p style={{ color: '#f3ef83' }}>{success}</p>

                    <form className="form-res"
                        onSubmit={handleSubmit}
                        method="post">

                        <div className="inputs-res">
                            {/* <label htmlFor="mail">Mail</label> */}
                            <input ref={addInput} type="password" name="pass1" placeholder="Password" required />
                        </div>
                        <div className="inputs-res">
                            {/* <label htmlFor="mail">Mail</label> */}
                            <input ref={addInput} type="password" name="pass2" placeholder="Confirm the password" required />
                        </div>

                        <div className="inputs-res">
                            <button onSubmit={handleSubmit} className="butres" type="submit">Reset</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Reset