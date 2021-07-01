import React from 'react';
import {useSelector} from 'react-redux'
import Deconnection from '../../Deconnection/Deconnection'

const Accueil = ()=>{

    const {logged} = useSelector(state => ({
        ...state.userLoggedReducer
    }))

    localStorage.setItem("logged",JSON.stringify(logged))

    return(
    <div>
        <h1>Salut ma couille!!</h1>
        <Deconnection/>
    </div>
    )
}

export default Accueil