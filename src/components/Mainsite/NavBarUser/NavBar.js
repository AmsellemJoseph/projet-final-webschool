import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Deconnection from '../../Deconnection/Deconnection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styleNavBarUser.css'
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

    const {sidebar} =useSelector(state => ({
        ...state.navBarUserReducer,
    }))

    const dispatch = useDispatch();

    const open = () => {
        dispatch({
            type: "TOGGLENAVUSER"
        })
    }

    const close = () => {
        dispatch({
            type: "CLOSENAVUSER"
        })
    }

console.log(sidebar)
    return (
        <div className="container-navbar-user">
            {sidebar?<p><FontAwesomeIcon onClick={open} icon={['fas','times']} style={{fontSize:'38px', cursor:'pointer'}}/></p>:<p><FontAwesomeIcon onClick={open} icon={['fas','bars']} style={{fontSize:'38px', cursor:'pointer'}}/></p>}
            
            <p>Hi {getUser.username}!<br/> You have {getUser.credit} credit(s)</p>
            <p>Buy more credits</p>
            <Deconnection />
        </div>
    )
}

export default NavBarUser