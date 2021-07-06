import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Token from '../../../../utils/Token'
import HorseLine from './HorseLine'

import './style.css'
import HorceRaceResult from './HorceRaceResult'

const HorseRaceGame = () => {

    const { nbrHorse } = useSelector(state => ({
        ...state.horseReducer
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
                    let tempsTemp = (Math.random() * 2.5) + (Math.random() * 2.5);
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
    }, 22000);

    return (<>
        <Token/>
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