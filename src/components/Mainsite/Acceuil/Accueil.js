import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Deconnection from '../../Deconnection/Deconnection'
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
    console.log(admin)

    return (
        <div>
            <h1>Salut {user.username}</h1>
            <Deconnection/>
        </div>
    )
}

export default Accueil