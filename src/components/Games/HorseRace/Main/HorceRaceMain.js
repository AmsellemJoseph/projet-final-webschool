import React, { useState, useEffect } from 'react';
import NavBar from '../../../Mainsite/NavBarUser/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'
const axios = require('axios')



const HorceRaceMain = () => {

    const [getUser, setUser] = useState({})

    useEffect(() => {
        const recup = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
            setUser(user.data[0]);
        }
        recup()

    }, [])

    console.log(getUser);

    const history = useHistory();
    const dispatch = useDispatch();
    const { nbrHorse } = useSelector(state => ({
        ...state.horseReducer,
    }))
    const [part, setPart] = useState(2);
    const [mise, setMise] = useState(10);
    const [choix, setChoix] = useState(1);
    const [option, setOption] = useState()

    const verifLog = JSON.parse(localStorage.getItem('logged'))
    if (!verifLog || verifLog.logged == false) {
        history.push('/');
    }

    const handleChange = (e) => {
        setPart(e.currentTarget.value)
    }
    const handleHorses = (game) => {
        dispatch({
            type: "SETHORSEGAME",
            payload: game
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const game = {
            nbrHorse: part,
            mise: mise,
            choix:choix
        }
        handleHorses(game)
        history.push('/horseracegame')

    }
    useEffect(() => {
        const opt = []
        console.log(choix);
        for (let i = 0; i < part; i++) {
            console.log(i);
            opt.push(<option key={i} value={i}>Horse number {i + 1}</option>)
        }
        setOption(opt)
    }, [part])

    console.log(choix);
    return (
        <div className="container-main-Race">
            {/* <NavBar/> */}
            <h2>STAR RACE GAME</h2>

            <form action="" method="post">
                <label htmlFor="credit">How many credit (s) do you want to bet?</label>
                <input type="number"
                    onChange={e => setMise(e.target.value)} defaultValue='10' min='10' max={getUser.credit} />
                <label htmlFor="participants">How many participants do you want?</label>
                <select onChange={handleChange} name="participants">
                    <option value="2">Two horses</option>
                    <option value="3">Three horses</option>
                    <option value="4">Four horses</option>
                    <option value="5">Five horses</option>
                </select>
                <select onChange={e => setChoix(e.target.value)}>
                    {option}
                </select>
                <button onClick={handleSubmit} type="submit">Let's Go!!</button>
            </form>
        </div>
    )
}

export default HorceRaceMain