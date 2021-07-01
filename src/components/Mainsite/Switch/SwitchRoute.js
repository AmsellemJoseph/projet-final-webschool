import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginSystem from '../../LoginSystem/Home/LoginSystem'
import Accueil from '../Acceuil/Accueil'

const SwitchRoute = () => {

    const dispatch = useDispatch();

    const stayLogged = ()=>{
        dispatch({
            type:"LOG"
        })
    }
    const log = JSON.parse(localStorage.getItem('logged'));

    useEffect(()=>{
        if(log){
            stayLogged()
        }
        
    },)

    const { logged } = useSelector(state => ({
        ...state.userLoggedReducer
    }))

    return (
        <Router>
            <Switch>
            {logged?<Accueil/>:<Route component={LoginSystem}/>}
            </Switch>
        </Router>
    )
}

export default SwitchRoute