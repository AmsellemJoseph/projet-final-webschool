import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Deconnection from '../../Deconnection/Deconnection'
import { useHistory } from 'react-router-dom'

const Admin = () => {

    const history = useHistory();


    const admin = JSON.parse(localStorage.getItem('admin'));

    useEffect(()=>{
        const verifAdmin = () => {
            if (admin.admin != true) {
                history.push('/')
                console.log(admin.admin);
                return localStorage.setItem('admin', JSON.stringify({ admin: false }));
            }
            console.log(admin.admin);
            localStorage.setItem('admin', JSON.stringify({ admin: false }));
        }
        verifAdmin();

    },[])

    localStorage.setItem('logged', JSON.stringify(false));
    localStorage.setItem("user", JSON.stringify(""));





    return (
        <div>
            <h1>SALUT ADMIN</h1>
            <Deconnection />
        </div>
    )
}

export default Admin