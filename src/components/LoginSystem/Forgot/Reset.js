import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './reset.css'
import ResetPassword from './logicReset'
import CircularIndeterminate from '../../../utils/CircularIndeterminate'
const axios = require('axios')

const Reset = () => {

    const history = useHistory();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { loading } = useSelector(state => ({
        ...state.loadingReducer
    }))

    const dispatch = useDispatch();
    const load = () => {
        dispatch({
            type: "LOADING"
        })
    }
    const stopLoad = () => {
        dispatch({
            type: "LOADED"
        })
    }

    const inputs = useRef([]);
    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (Number(tokTemp.data) === 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        load()
        const mail = JSON.parse(localStorage.getItem('user'))
        const Reset = new ResetPassword("http://localhost:2108/registration", mail, inputs.current[0].value, inputs.current[1].value)
        const verifPass = Reset.verifPass()
        if (!verifPass) {
            stopLoad()
            return setError("Please confirm the same password!")
        }
        const verifPassStrong = Reset.verifPassStrong();
        if (!verifPassStrong) {
            stopLoad()
            return setError('Please choose a password with a leat one lowercase character, one uppercase character, one digit and one special character and a least 8 characters long')
        }
        const res = await Reset.resetingPassword();
        if (!res) {
            stopLoad()
            return setError('An error as occured,please try again later')
        }
        stopLoad()
        setError("")
        setSuccess('Password successfully updated');
        setTimeout(() => {
            localStorage.clear();
            return history.push('/')

        }, 3000);
    }


    return (
        <div className="container-main-resPage">
            <div className="container-res">
                <div className="overlay-res"></div>
                <div className="container-form-res">
                    <h2>Reset</h2>
                    <p style={{ color: '#a035fd' }}>{error}</p>
                    <p style={{ color: '#f3ef83' }}>{success}</p>
                    {loading ? <CircularIndeterminate /> : null}
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