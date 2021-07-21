import React, { useState, useEffect } from 'react';
import MainBarUser from '../../../Mainsite/NavBarUser/MainBarUser'
import {  useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'
const axios = require('axios')




const HorceRaceMain = () => {
    const history = useHistory();
    const mail = JSON.parse(localStorage.getItem('user'))

    const [getUser, setUser] = useState({})
    useEffect(() => {
        const tok = async () => {
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

    useEffect(() => {
        const recup = async () => {
            const userTemp = localStorage.user ? JSON.parse(localStorage.getItem('user')) : 'none'
            if (userTemp !== 'none') {
                const mail = userTemp.mail
                const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
                setUser(user.data[0]);
            }
        }
        recup()

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();
    const [part, setPart] = useState(2);
    const [mise, setMise] = useState(10);
    const [choix, setChoix] = useState(1);
    const [option, setOption] = useState()


    const handleChange = (e) => {
        setPart(e.currentTarget.value)
    }
    const handleHorses = (game) => {
        dispatch({
            type: "SETHORSEGAME",
            payload: game
        })
    }

    const handleChangeMise = (e) => {
        let miseTemp = e.target.value
        if (miseTemp > getUser.credit) {
            setMise(getUser.credit)
        } else {
            setMise(miseTemp)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const game = {
            nbrHorse: part,
            mise: mise,
            choix: choix
        }
        handleHorses(game)
        dispatch({
            type: "SETRACE"
        })
        const nameGame = "horseGame"
        const addGame = await axios.put('http://localhost:2108/registration/addgamerace', { params: { mail } })
        if (addGame) {
            const incrGame = await axios.put("http://localhost:2108/registration/incrgame", { params: { nameGame } })
            if (incrGame) {
                history.push('/horseracegame')
            }
        }

    }
    useEffect(() => {
        const opt = []
        for (let i = 1; i <= part; i++) {
            opt.push(<option key={i} value={i}>Starship number {i}</option>)
        }
        setOption(opt)
    }, [part])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container-main-Race">
            <MainBarUser />
            <h2>STAR RACE GAME</h2>

            <div className="container-form-race">

                <form action="" method="post">
                    <div className="form-par">
                        <h3>Choose the number of ships for the race, then the ships on which you bet your credits, pray, and WIN !!</h3>
                        <label htmlFor="credit">How many credit (s) do you want to bet?</label>
                        <input type="number"
                            onChange={handleChangeMise} defaultValue='10' min='10' max={getUser.credit} />
                    </div>
                    <div className="form-par">
                        <label htmlFor="participants">How many participants do you want?</label>
                        <select onChange={handleChange} name="participants">
                            <option value="2">Two starships</option>
                            <option value="3">Three starships</option>
                            <option value="4">Four starships</option>
                            <option value="5">Five starships</option>
                        </select>
                    </div>
                    <div className="form-par">
                        <select onChange={e => setChoix(e.target.value)}>
                            {option}
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit">Let's Go!!</button>
                </form>
            </div>
        </div>
    )
}

export default HorceRaceMain