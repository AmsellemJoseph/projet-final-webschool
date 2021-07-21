import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import MainBarUser from '../../Mainsite/NavBarUser/MainBarUser'
import './style.css'


import CircularIndeterminate from '../../../utils/CircularIndeterminate'

var md5 = require('md5');
const axios = require('axios')


const ChangePassword = () => {
    const history = useHistory();

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
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    const [error, setError] = useState("")
    const [success, setSuccess] = useState('')
    const [pass, setPass] = useState('');

    const handleChange = (e) => {
        setPass(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const local = JSON.parse(localStorage.getItem('user'))
        const user = {
            mail:local.mail,
            password:md5(pass)
        }

        const verif = await axios.post('http://localhost:2108/registration/connection',{params:{user}})
        if(!verif.data.connection){
           return setError("Sorry, but it's not the current password")
        }else{
            history.push('/resetpassword')
        }
    }


    return (
        <div className="main-container-change-photo">
            <MainBarUser />
            <div className="container-form-change-pass">
                <form action="" onSubmit={handleSubmit}  method="post">
                    <h2>Confirm your current password</h2>
                    <p style={{ color: '#0d122f', marginBottom: '20px' }}>{error}</p>
                    <p style={{ color: '#f3ef83' }}>{success}</p>
                    <input onChange={handleChange} type="password" name="password" placeholder="Current password" />
                    <input type="submit" className="btn-sub-change" value="Confirm" />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword