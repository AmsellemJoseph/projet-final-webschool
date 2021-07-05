import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import HorseLine from './HorseLine'

import './style.css'
import HorceRaceResult from './HorceRaceResult'

const HorseRaceGame = () => {

    const { nbrHorse } = useSelector(state => ({
        ...state.horseReducer
    }))
    const [temps, setTemp] = useState([]);
    const [tempsTotal, setTempTotal] = useState([]);
    const [flag,setFlag]=useState(false)
    const lignes = nbrHorse.nbrHorse;


    useEffect(() => {
        const tempA = () => {

            let tempsTempArr = []
            let tempLignArr = []
            for (let i = 0; i < lignes; i++) {
                for (let j = 0; j < 5; j++) {
                    let tempsTemp = (Math.random() * 2.5)+(Math.random() * 2.5);
                    tempsTemp = Math.floor(tempsTemp*100)/100
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
                    total += temps[i][j];
                }
                totalArr.push(total);
                total = 0;
            }
            setTempTotal(totalArr);
        }
        tempT();
    },[temps])


    console.log(nbrHorse);
    const petitTemps = tempsTotal.sort((a,b)=>b-a)[tempsTotal.length-1];

        setTimeout(() => {
            setFlag(true);
        }, 22000);

    return (<>
        {flag?<HorceRaceResult petitTemps={petitTemps} tempsTotal={tempsTotal}/>:
        <div className="horseracegame-main-container">
            {temps.map((temp, i) => {
                return <HorseLine temps={temp} key={i} routecourse={i}/>
            })}
        </div>}
        </>
    )
}

export default HorseRaceGame