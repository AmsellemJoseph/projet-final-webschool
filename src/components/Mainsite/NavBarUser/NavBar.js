import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Deconnection from '../../Deconnection/Deconnection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

console.log(sidebar)
    return (
        <div className="container-navbar-user">
            {sidebar?<p><FontAwesomeIcon onClick={open} icon={['fas','times']} style={{fontSize:'38px', cursor:'pointer'}}/></p>:<p><FontAwesomeIcon onClick={open} icon={['fas','bars']} style={{fontSize:'38px', cursor:'pointer'}}/></p>}
            
            <p>Hi {getUser.username}!</p>
            <p style={{marginRight:'25px'}}>You have {getUser.credit} credit(s)</p>

        </div>
    )
}

export default NavBarUser