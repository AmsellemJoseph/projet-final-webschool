import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import UserImg from './OptionsSideBar/UserImg'
import './styleNavBarUser.css'


const SideBar = ()=>{

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
        <div className="main-container">
            {sidebar?<div onClick={close} className="overlay"></div>:null}
        <div className={sidebar?"main-container-sidebar-on":"main-container-sidebar-off"}>
            <UserImg/>
            <UserImg/>
        </div>
        </div>
    )
}

export default SideBar