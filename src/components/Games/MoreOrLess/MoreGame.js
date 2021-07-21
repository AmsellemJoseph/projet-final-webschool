import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'

const axios = require('axios')


const MoreGame = () => {
    
    const { clicker,moreOrLess, miseMoreOrLess, countMore } = useSelector(state => ({
        ...state.moreOrLessReducer,
        ...state.gameLauncherReducer
    }))
    const history = useHistory();
    const [random, setRandom] = useState(0);
    const [error, setError] = useState("")
    const [choice, setChoice] = useState('');


    useEffect(() => {
        const setGame = () => {
            if (!moreOrLess) {
                history.push('/')
            }
        }
        setGame();
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const rand = () => {
            const numTemp = Math.floor(Math.random() * 10000)
            setRandom(numTemp)
        }
        rand()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const looseCredit = async (mail, mise) => {
        return await axios.put(`http://localhost:2108/registration/credits`, { params: { mail, mise } })
    }

    useEffect(() => {

        const credits = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const mise = miseMoreOrLess
            looseCredit(mail, mise)
        }
        credits()

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (choice == random) {
            return history.push('/moreresult')
        } else if (choice > random) {
            setError("Its less than " + choice)
        } else if (choice < random) {
            setError("Its more than " + choice)
        }
        setChoice('')
        dispatch({
            type: "COUNTLEFT"
        })
        if (countMore === 0) {
            return history.push('/moreresult')
        }
    }

    const handleChange = (e) => {
        setChoice(e.target.value)
    }


    return (
        // <div>SALUT</div>
        <div className="main-container-more">
            <div className="container-form-more">
                <form action=""
                    onSubmit={handleSubmit}
                    method="post">
                    <h2>Choose your number:</h2>
                    <p>You have {countMore} chance left</p>
                    <p style={{background:"#0d122f",color:'#71f6ff',borderRadius:'9999px'}}>{error}</p>
                    <input onChange={handleChange} value={choice} type="number" name="choice" placeholder="Your number" />
                    <input type="submit" className="btn-sub-change" value="Confirm" />
                </form>
            </div>
        </div>
    )
}

export default MoreGame