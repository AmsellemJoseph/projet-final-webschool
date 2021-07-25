import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import NavBar from './NavBar'
import SideBar from './SideBar'
import './styleNavBarUser.css'
const axios = require('axios')

const MainBarUser = () => {

    const history = useHistory();

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

    const [getUser, setUser] = useState({})
    useEffect(() => {
        const recup = async () => {
            const userTemp = localStorage.user ? JSON.parse(localStorage.getItem('user')) : 'none'
            if (userTemp !== 'none') {
                const mail = userTemp.mail
                const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
                setUser(user.data[0]);
            }
        }
        recup()

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container-main-bar-user">
            <NavBar getUser={getUser} />
            <SideBar pic={getUser.profilPic} />
        </div>
    )
}

export default MainBarUser