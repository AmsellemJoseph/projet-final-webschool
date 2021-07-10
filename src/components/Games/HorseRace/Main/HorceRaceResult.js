import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Token from '../../../../utils/Token'
import './style.css'
const axios = require('axios');




const HorceRaceResult = ({ tempsTotal, petitTemps, ind }) => {

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const mailCredit = mail.mail
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    const [gainCredit,setGainCredit]= useState(0)
    const history = useHistory();
    const { nbrHorse,race } = useSelector(state => ({
        ...state.horseReducer,
        ...state.gameLauncherReducer
    }))

    const [flag, setFlag] = useState(false)

    const [win, setWin] = useState('');
    const [loose, setLoose] = useState('');

    const dispatch = useDispatch();

    const looseCredit = async (mail, mise) => {
        return await axios.put(`http://localhost:2108/registration/credits`, { params: { mail, mise } })
    }
    const winCredits = async (mail, gain) => {
        return await axios.put(`http://localhost:2108/registration/creditsplus`, { params: { mail, gain } })
    }

    useEffect(() => {
        const credits = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const mise = nbrHorse.mise
            const nbrHorses = nbrHorse.nbrHorse;
            if (nbrHorse.choix != (ind + 1)) {
                looseCredit(mail, mise)
                setLoose("YOU LOOSE!!")
            }
            // if (nbrHorse.choix == ind) {
            else {
                let gain = 0
                if (nbrHorses == 2) {
                    gain = mise;
                    setGainCredit(gain)
                } else if (nbrHorses == 3) {
                    gain = 2 * mise
                    setGainCredit(gain)
                } else if (nbrHorses == 4) {
                    gain = 3 * mise
                    setGainCredit(gain)
                } else if (nbrHorses == 5) {
                    gain = 4 * mise
                    setGainCredit(gain)
                }
                winCredits(mail, gain)
                setWin("YOU WON!!")
                setFlag(true)
            }
        }
        credits()
    }, [])
    setTimeout(() => {
        dispatch({
            type:"RESETGAME"
        })
        history.push('/')
    }, 4000);

    console.log(`Le choix est: ${nbrHorse.choix} et ind: ${ind + 1}`)

    return (
        <div className="container-result">
            {race?null:<Token/>}
            {flag ? <div className="container-result-win">
                <h2>CONGRATULATION</h2>
                <p>You won {gainCredit} tokens</p>
            </div> : <div className="container-result-loose"></div>}
        </div>
    )
}

export default HorceRaceResult;