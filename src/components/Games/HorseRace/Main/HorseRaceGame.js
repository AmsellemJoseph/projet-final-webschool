import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import HorseLine from './HorseLine'
import './style.css'
import HorceRaceResult from './HorceRaceResult'

const axios = require('axios')


const HorseRaceGame = () => {

    const history = useHistory();
    const [countDown, setCountDown] = useState(0)

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

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (Number(tokTemp.data) === 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const { nbrHorse } = useSelector(state => ({
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

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

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
    }, [temps])//eslint-disable-line react-hooks/exhaustive-deps

    var petitTemps = 30;
    for (let i = 0; i < tempsTotal.length; i++) {
        if (tempsTotal[i] < petitTemps) {
            petitTemps = tempsTotal[i];
        }
    }
    const [grandTemps, setGrandTemps] = useState(0)

    for (let i = 0; i < tempsTotal.length; i++) {
        if (tempsTotal[i] > grandTemps) {
            setGrandTemps(tempsTotal[i]);
        }
    }

    const ind = tempsTotal.indexOf(petitTemps)

    // setTimeout(() => {
    //     setFlag(true);
    // }, 20000);

    useEffect(() => {
        const countGame = () => {
            var x = null;
            x = setInterval(() => {
                setCountDown(countDown + 3)
            }, 3000);
            if (countDown >= grandTemps + 1) {
                clearInterval(x)
                setFlag(true)
            }
        }
        countGame();
    }, [countDown])//eslint-disable-line react-hooks/exhaustive-deps

    return (<>
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