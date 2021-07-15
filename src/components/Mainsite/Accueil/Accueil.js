import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import MainBarUser from '../NavBarUser/MainBarUser'
import Bored from './Bored/Bored'
import './accueil.css'
const axios = require('axios')
// import HorceRaceMain from '../../Games/HorseRace/Main/HorceRaceMain'
const Accueil = () => {

    const history = useHistory();
    const [credit, setCredit] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const tok = async () => {
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
            const userCredit = await axios.post('http://localhost:2108/registration/getcredit', { params: { mailCredit } })
            setCredit(userCredit.data.credit)
        }
        tok()
    }, [])

    const handleHorse = () => {
        dispatch({
            type: "SETRACE"
        })
        history.push('/horserace')
    }

    return (
        <div className='container-accueil'>
            <div className="container-accueil-auto">
                <MainBarUser />
                <div className="spacenav"></div>
                <div className="bored"><Bored /></div>
                <div className='main-container-game'>
                    <h2>Choose which game you want to play.</h2>
                    <div className="containerGames">
                        {credit >= 10 ? <button onClick={handleHorse}>HorceRaceMain</button> : <div><button style={{ background: 'black' }} disabled onClick={handleHorse}>HorceRaceMain <p style={{ color: 'red' }}>You don't have enough credit</p></button></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accueil