import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Token from '../../../../utils/Token'
import HorseLine from './HorseLine'
import './style.css'
import HorceRaceResult from './HorceRaceResult'

const axios = require('axios')


const HorseRaceGame = () => {

    const history = useHistory();

    const looseCredit = async (mail, mise) => {
        return await axios.put(`http://localhost:2108/registration/credits`, { params: { mail, mise } })
    }

    useEffect(() => {

        const credits = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const mise = nbrHorse.mise
            looseCredit(mail, mise)
        }
        credits()

    }, [])

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
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    const { nbrHorse, race } = useSelector(state => ({
        ...state.horseReducer,
        ...state.gameLauncherReducer,
    }))
    const [temps, setTemp] = useState([]);
    const [tempsTotal, setTempTotal] = useState([]);
    const [flag, setFlag] = useState(false)
    const lignes = nbrHorse.nbrHorse;

    const color = ['blue', 'red', 'yellow', 'green', 'purple']

    useEffect(() => {
        const tempA = () => {

            let tempsTempArr = []
            let tempLignArr = []
            for (let i = 0; i < lignes; i++) {
                for (let j = 0; j < 5; j++) {
                    let tempsTemp = (Math.random() * 2) + (Math.random() * 2);
                    tempsTemp = Math.floor(tempsTemp * 100) / 100
                    tempLignArr.push(tempsTemp);
                    tempsTemp = 0;
                }
                tempsTempArr.push(tempLignArr);
                tempLignArr = [];
            }
            setTemp(tempsTempArr)
        }

        tempA();

    }, [])

    useEffect(() => {
        const tempT = () => {

            let total = 0
            let totalArr = []
            for (let i = 0; i < temps.length; i++) {
                for (let j = 0; j < 5; j++) {
                    total = total + temps[i][j];
                }
                totalArr.push(total);
                total = 0;
            }
            setTempTotal(totalArr);
        }
        tempT();
    }, [temps])

    var petitTemps = 30;
    for (let i = 0; i < tempsTotal.length; i++) {
        if (tempsTotal[i] < petitTemps) {
            petitTemps = tempsTotal[i];
        }
    }

    const ind = tempsTotal.indexOf(petitTemps)

    setTimeout(() => {
        setFlag(true);
    }, 20000);
    return (<>
        {race ? null : <Token />}
        {flag ? <HorceRaceResult petitTemps={petitTemps} tempsTotal={tempsTotal} ind={ind} /> :
            <div className="horseracegame-main-container">
                {temps.map((temp, i) => {
                    return <HorseLine temps={temp} key={i} number={i} color={color[i]} />
                })}
            </div>}
    </>
    )
}

export default HorseRaceGame