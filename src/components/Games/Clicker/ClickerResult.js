import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
const axios = require('axios')

const ClickerResult = () => {

    

    const { clickCount, miseClick } = useSelector(state => ({
        ...state.clickerReducer
    }))

    const [flag, setFlag] = useState(false)
    const [gain, setGain] = useState(0)
    const { mail, username } = JSON.parse(localStorage.getItem('user'))


    const winCredits = async (mail, gain) => {
        return await axios.put(`http://localhost:2108/registration/creditsplus`, { params: { mail, gain } })
    }

    useEffect(() => {


        const resultGame = async () => {

            if (clickCount > 80) {
                setFlag(true)
                if (clickCount === 80) {
                    setGain(miseClick)
                } else if (clickCount <= 90) {
                    setGain(miseClick * 1.5)
                } else if (clickCount <= 100) {
                    setGain(miseClick * 2)
                } else if (clickCount <= 150) {
                    setGain(miseClick * 3)
                } else if (clickCount <= 200) {
                    setGain(miseClick * 5)
                } else {
                    setGain(miseClick * 10)
                }

            }
            if (flag) {
                const result = {
                    username: username,
                    date: Date.now(),
                    clickCount: clickCount,
                    gain: gain,
                }
                await axios.post("http://localhost:2108/registration/sendresultclick", { params: { result } })
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

export default ClickerResult