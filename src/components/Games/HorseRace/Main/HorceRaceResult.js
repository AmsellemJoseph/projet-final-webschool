import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Token from '../../../../utils/Token'
import './style.css'
const axios = require('axios');




const HorceRaceResult = ({ ind }) => {

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])

    const [gainCredit, setGainCredit] = useState(0)
    const history = useHistory();
    const { nbrHorse, race } = useSelector(state => ({
        ...state.horseReducer,
        ...state.gameLauncherReducer
    }))

    const [flag, setFlag] = useState(false)



    const winCredits = async (mail, gain) => {
        return await axios.put(`http://localhost:2108/registration/creditsplus`, { params: { mail, gain } })
    }

    useEffect(() => {
        const credits = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const username = userTemp.username
            const mise = nbrHorse.mise
            const nbrHorses = nbrHorse.nbrHorse;
            if (nbrHorse.choix != (ind + 1)) {
            }
            // if (nbrHorse.choix == ind) {
            else {
                let gain = 0
                if (nbrHorses == 2) {
                    gain = 2 * mise;
                    setGainCredit(gain)
                } else if (nbrHorses == 3) {
                    gain = 3 * mise
                    setGainCredit(gain)
                } else if (nbrHorses == 4) {
                    gain = 4 * mise
                    setGainCredit(gain)
                } else if (nbrHorses == 5) {
                    gain = 5 * mise
                    setGainCredit(gain)
                }
                const result = {
                    username: username,
                    date: Date.now(),
                    gain: gain,
                }
                await axios.post("http://localhost:2108/registration/sendresulthorse", { params: { result } })
                winCredits(mail, gain)
                setFlag(true)
            }

        }
        credits()
    }, [])
    // setTimeout(() => {
    //     dispatch({
    //         type: "RESETGAME"
    //     })
    //     history.push('/')
    // }, 4000);

    // console.log(`Le choix est: ${nbrHorse.choix} et ind: ${ind + 1}`)

    return (
        <div className="container-result">
            {race ? null : <Token />}
            {flag ? <div className="container-result-win">
                <h2>CONGRATULATION</h2>
                <p>You won {gainCredit} tokens</p>
                <a href="/">Main menu</a>
            </div> : <div className="container-result-loose">
                <a href="/">Main menu</a></div>}
        </div>
    )
}

export default HorceRaceResult;
