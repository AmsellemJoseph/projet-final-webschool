import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import SwitchRoute from '../Mainsite/Switch/SwitchRoute'

const Deconnection = ()=>{

    const {logged} = useSelector(state => ({
        ...state.userLoggedReducer
    }))

    const dispatch = useDispatch();
    const handleDeconnection = ()=>{
        dispatch({
            type:"DECO"
        })
        localStorage.setItem("logged",JSON.stringify(false))
    }

    return(
        <Router>  
            {logged?<button onClick={handleDeconnection}>Deconnection</button>:<Route component={SwitchRoute}/>}
        </Router>

    )
}

export default Deconnection