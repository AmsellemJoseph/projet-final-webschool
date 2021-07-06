import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Token from '../../../../utils/Token'
const axios = require('axios');


const HorceRaceResult = ({ tempsTotal, petitTemps, ind }) => {
    const history = useHistory();
    const { nbrHorse } = useSelector(state => ({
        ...state.horseReducer
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
                } else if (nbrHorses == 3) {
                    gain = 2 * mise
                } else if (nbrHorses == 4) {
                    gain = 3 * mise
                } else if (nbrHorses == 5) {
                    gain = 4 * mise
                }
                winCredits(mail, gain)
                setWin("YOU WON!!")
                setFlag(true)
            }
        }
        credits()
    }, [])
    setTimeout(() => {
        history.push('/')
    }, 5000);

    console.log(`Le choix est: ${nbrHorse.choix} et ind: ${ind + 1}`)

    return (
        <div>
            <Token/>
            {tempsTotal.map((temp, i) => {
                return <p key={i}>Le coureur {i + 1} a termine la course en {temp}s!</p>
            })}
            {flag ? win : loose}
        </div>
    )
}

export default HorceRaceResult;