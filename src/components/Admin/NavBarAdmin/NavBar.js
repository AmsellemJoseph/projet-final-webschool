import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Deconnection from '../../Deconnection/Deconnection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import './styleNavBarUser.css'
const axios = require('axios')


const NavBarUser = ({getUser}) => {


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
    return (
        <div className="container-navbar-user">
            {sidebar?<p><FontAwesomeIcon onClick={open} icon={['fas','times']} style={{fontSize:'38px', cursor:'pointer'}}/></p>:<p><FontAwesomeIcon onClick={open} icon={['fas','bars']} style={{fontSize:'38px', cursor:'pointer'}}/></p>}
            
            <p>Hi {getUser.username}!</p>
            <p style={{marginRight:'25px'}}>You have {getUser.credit} credit(s) - <a style={{color:"#f3ef83"}} href="/paypal">Buy more</a></p>
            <Avatar style={{marginRight:'25px'}} src={process.env.PUBLIC_URL + `uploads/${getUser.profilPic}`}/>

        </div>
    )
}

export default NavBarUser