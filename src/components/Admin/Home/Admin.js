import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import MainBarAdmin from '../NavBarAdmin/MainBarAdmin'
import Stats from './Stats/Stats'

import './style.css'
const axios = require('axios')

const Admin = () => {


    const history = useHistory();

    const [flag, setFlag] = useState(false)
    useEffect(() => {

        const getUser = async () => {

            const { mail } = JSON.parse(localStorage.getItem('user'))

            const username = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } })
            if (username.data[0].username !== 'admin') {
                localStorage.clear()
                return history.push('/login')
            } else {
                setFlag(true)
            }

        }
        getUser();

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const verifAdmin = async () => {
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
        verifAdmin();


    }, [])//eslint-disable-line react-hooks/exhaustive-deps





    return (
        <div className="main-container-admin-page">
            <MainBarAdmin />
            <div className="main-container-users-tab">
                {flag ? <Stats /> : null}

            </div>

        </div>
    )
}

export default Admin