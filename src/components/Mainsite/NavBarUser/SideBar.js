import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import UserImg from './OptionsSideBar/UserImg'
import Deconnection from '../../Deconnection/Deconnection'
import Barre from '../../../utils/Barre'
import './styleNavBarUser.css'


const SideBar = ({pic})=>{

    const {sidebar} = useSelector(state => ({
        ...state.navBarUserReducer
    }))

    const dispatch =useDispatch();

    const close = () => {
        dispatch({
            type: "CLOSENAVUSER"
        })
    }

    return(
        <div className={sidebar?"main-container":'none'}>
            {sidebar?<div onClick={close} className="overlay"></div>:<div onClick={close} className="overlay" ></div>}
        <div className={sidebar?"main-container-sidebar-on":"main-container-sidebar-off"}>
            <UserImg pic={pic}/>
            <a href="/changephoto">Change your profil picture</a>
            <a href="/changepassword">Change your password</a>
            <Barre/>
            <a href="/accueil">Home</a>
            <Barre/>
            <a href="/paypal">Buy more credits</a>
            <Deconnection/>

        </div>
        </div>
    )
}

export default SideBar