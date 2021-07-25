import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserImg from './OptionsSideBar/UserImg'
import Deconnection from '../../Deconnection/Deconnection'
import Barre from '../../../utils/Barre'
import './styleNavBarUser.css'

const axios = require('axios')


const SideBar = ({ pic }) => {

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

    const { sidebar } = useSelector(state => ({
        ...state.navBarUserReducer
    }))

    const dispatch = useDispatch();

    const close = () => {
        dispatch({
            type: "CLOSENAVUSER"
        })
    }

    return (
        <div className={sidebar ? "main-container" : 'none'}>
            {sidebar ? <div onClick={close} className="overlay"></div> : <div onClick={close} className="overlay" ></div>}
            <div className={sidebar ? "main-container-sidebar-on" : "main-container-sidebar-off"}>
                <UserImg pic={pic} />
                <a href="/changephoto">Change your profil picture</a>
                <a href="/changepassword">Change your password</a>
                <Barre />
                <a href="/accueil">Home</a>
                <a href="/chat">Chat</a>
                <Barre />
                <a href="/paypal">Buy more credits</a>
                <Deconnection />

            </div>
        </div>
    )
}

export default SideBar