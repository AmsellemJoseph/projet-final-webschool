import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Deconnection from '../../Deconnection/Deconnection'
import NavBarUser from '../NavBarUser/NavBar'
import './accueil.css'
// import HorceRaceMain from '../../Games/HorseRace/Main/HorceRaceMain'
const Accueil = () => {

    const history = useHistory();

    const { user, admin } = useSelector(state => ({
        ...state.userInfoReducer,
        ...state.userLoggedReducer
    }))

    const verifLog = JSON.parse(localStorage.getItem('logged'))
    if (!verifLog || verifLog.logged == false) {
        history.push('/');
    }
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