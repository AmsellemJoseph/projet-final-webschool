import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Deconnection from '../../Deconnection/Deconnection'
import NavBarUser from '../NavBarUser/NavBar'
import './accueil.css'
const axios = require('axios')
// import HorceRaceMain from '../../Games/HorseRace/Main/HorceRaceMain'
const Accueil = () => {

    const history = useHistory();
    const [token, setToken] = useState('')
    const { user, admin } = useSelector(state => ({
        ...state.userInfoReducer,
        ...state.userLoggedReducer
    }))


        useEffect(() => {
            const tok = async () => {
                const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if(!mail || !tokenLocal){
                history.push('/login')
            }
            console.log(tokenLocal);
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            console.log(tokTemp.data);
            if(tokTemp.data==1){
            }else{
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }

        tok()
    }, [])

    const handleHorse = () => {
        history.push('/horserace')
    }

    return (
        <div className='container-accueil'>
            <NavBarUser />
            <div className='main-container-game'>
                <h2>Choose which game you want to play.</h2>
                <div className="containerGames">
                    <button onClick={handleHorse}>HorceRaceMain</button>
                </div>
            </div>
        </div>
    )
}

export default Accueil