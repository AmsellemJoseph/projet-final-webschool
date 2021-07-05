import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Deconnection from '../../Deconnection/Deconnection'
import './navbar.css';
const axios = require('axios')


const NavBarUser = () => {

    const [getUser,setUser] = useState({})

    useEffect(()=>{
        const recup = async()=>{
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
            setUser(user.data[0]);
        }
        recup()

    },[])


    return (
        <div className="container-navbar-user">
            <p>Hi {getUser.username}!<br/> You have {getUser.credit} credit(s)</p>
            <p>Buy more credits</p>
            <Deconnection />
        </div>
    )
}

export default NavBarUser