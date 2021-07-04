import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'

const Deconnection = () => {

    const history = useHistory();

    const { admin } = useSelector(state => ({
        ...state.userLoggedReducer,
        ...state.userInfoReducer
    }))

    if (admin) {
        history.push('/admin');
    }

    const dispatch = useDispatch();
    const handleDeconnection = () => {
        dispatch({
            type: "DECO",
        })
        dispatch({
            type: "DESTROY"
        })
        localStorage.setItem("logged", JSON.stringify(false))
        localStorage.setItem("user", JSON.stringify(""))
        history.push('/');
    }

    return (
        <Router>
            <div className="button-deconnection" >
                <button onClick={handleDeconnection}>Deconnection</button>
            </div>
        </Router>

    )
}

export default Deconnection