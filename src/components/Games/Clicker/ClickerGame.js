import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'

const axios = require('axios')


const ClickerGame = () => {

    const history = useHistory();
    const [countDown, setCountDown] = useState(15)

    const { clickCount, miseClick, clicker } = useSelector(state => ({
        ...state.clickerReducer,
        ...state.gameLauncherReducer
    }))

    useEffect(() => {
        const setGame = () => {
            if (!clicker) {
                history.push('/')
            }
        }
        setGame();
    }, [])

    const looseCredit = async (mail, mise) => {
        return await axios.put(`http://localhost:2108/registration/credits`, { params: { mail, mise } })
    }

    useEffect(() => {

        const credits = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const mise = miseClick
            looseCredit(mail, mise)
        }
        credits()

    }, [])

    const dispatch = useDispatch();

    const clickButton = (e) => {
        dispatch({
            type: 'ADDCLICKGAME'
        })
    }

    const handleKey = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        const timeCount = () => {
            var x = null
            x = setTimeout(() => {
                setCountDown(countDown - 1);
            }, 1000)
            if (countDown === 0) {
                clearTimeout(x)
                history.push('/clickerresult')
            }
        }
        timeCount()
    }, [countDown])


    return (
        <div className="container-game">
            <h2 className="number-clicks">Countdown: {countDown}s</h2>
            <h2 className="number-clicks">Number of clicks: {clickCount}</h2>
            <button className="button-push" onKeyPress={handleKey} onClick={clickButton}></button>
        </div>
    )
}

export default ClickerGame