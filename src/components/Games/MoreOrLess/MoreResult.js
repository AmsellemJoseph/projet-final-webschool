import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
const axios = require('axios')

const MoreResult = () => {



    const { miseMoreOrLess, countMore, moreOrLess } = useSelector(state => ({
        ...state.moreOrLessReducer,
        ...state.gameLauncherReducer
    }))

    const history = useHistory();
    const [flag, setFlag] = useState(false)
    const [gain, setGain] = useState(0)
    const { mail, username } = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const setGame = () => {
            if (!moreOrLess) {
                history.push('/')
            }
        }
        setGame();
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const winCredits = async (mail, gain) => {
        return await axios.put(`http://localhost:2108/registration/creditsplus`, { params: { mail, gain } })
    }

    useEffect(() => {


        const resultGame = async () => {

            if (countMore > 0) {
                setFlag(true)
                if (countMore <= 5) {
                    setGain(miseMoreOrLess)
                } else if (countMore <= 7) {
                    setGain(miseMoreOrLess * 1.5)
                } else if (countMore <= 10) {
                    setGain(miseMoreOrLess * 2)
                } else if (countMore <= 12) {
                    setGain(miseMoreOrLess * 3)
                } else if (countMore <= 13) {
                    setGain(miseMoreOrLess * 5)
                } else {
                    setGain(miseMoreOrLess * 10)
                }

            }
            if (flag) {
                const result = {
                    username: username,
                    date: Date.now(),
                    try: 15 - countMore,
                    gain: gain,
                }
                await axios.post("http://localhost:2108/registration/sendresultmore", { params: { result } })
                winCredits(mail, gain)
            }
        }
        resultGame()
    }, [gain])//eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="container-result">
            {flag ? <div className="container-result-win">
                <h2>CONGRATULATION</h2>
                <p>You won {gain} credits</p>
                <a href="/">Main menu</a>
            </div> : <div className="container-result-loose">
                <a href="/">Main menu</a></div>}
        </div>
    )
}

export default MoreResult