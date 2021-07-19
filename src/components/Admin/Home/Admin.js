import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Deconnection from '../../Deconnection/Deconnection'
import { useHistory } from 'react-router-dom'
import MainBarAdmin from '../NavBarAdmin/MainBarAdmin'
import Stats from './Stats'

import './style.css'
const axios = require('axios')

const Admin = () => {

    const history = useHistory();

    const [stat,setStat]=useState([
        {
            nameGame : "horseGame",
            coll : "horsesgames"
        },
        {
            nameGame : "clickGame",
            coll : "clickgames"
        },
    ])

    const admin = JSON.parse(localStorage.getItem('admin'));
    useEffect(() => {
        const verifAdmin = async () => {
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
            // if (admin.admin != true) {
            //     history.push('/')
            //     console.log(admin.admin);
            //     return localStorage.setItem('admin', JSON.stringify({ admin: false }));
            // }
            // console.log(admin.admin);
            // localStorage.setItem('admin', JSON.stringify({ admin: false }));
            // localStorage.setItem('logged', JSON.stringify(false));
            // localStorage.setItem("user", JSON.stringify(""));
        }
        verifAdmin();


    }, [])






    return (
        <div className="main-container-admin-page">
            <MainBarAdmin/>
            <div>
                <h3 style={{fontSize:'20px',paddingTop:'100px',marginBottom:'25px',fontFamily:'Audiowide',color:"#71f6ff"}}>Statistics</h3>
                <div className="container-stats">
                    {stat.map((stat,i)=>{
                        return <Stats key={i} nameGame={stat.nameGame} coll={stat.coll}  />
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default Admin