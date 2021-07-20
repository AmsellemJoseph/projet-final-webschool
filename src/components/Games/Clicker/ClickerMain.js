import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MainBarUser from '../../Mainsite/NavBarUser/MainBarUser'
import Token from '../../../utils/Token'
import './style.css'

const axios = require('axios')

const ClickerMain = () => {

    const history = useHistory();

    const [getUser, setUser] = useState({})
    const [mise, setMise] = useState(50);

    const dispatch = useDispatch();
    const mail = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const tok = async () => {
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const mailCredit = mail.mail
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])

    useEffect(() => {
        const recup = async () => {
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
            setUser(user.data[0]);
        }
        recup()

    }, [])




    const handleChangeMise = (e) => {
        let miseTemp = e.target.value
        if (miseTemp > getUser.credit) {
            setMise(getUser.credit)
        } else {
            setMise(miseTemp)
        }
    }

    const letsGo = async (e) => {
        e.preventDefault()
        dispatch({
            type: "MISECLICKER",
            payload: mise
        })
        dispatch({
            type: "SETCLICKER",
        })
        const nameGame = "clickGame"
        const addGame = await axios.put('http://localhost:2108/registration/addgameclick', { params: { mail } })
        if (addGame) {
            const incrGame = await axios.put("http://localhost:2108/registration/incrgame", { params: { nameGame } })
            if (incrGame) {
                history.push('/clickercount')
            }
        }
    }


    return (
        <div className="container-main-Race">
            {/* {race ? null : <Token />} */}
            <MainBarUser />
            <h2>CLICKER MANIA</h2>

            <div className="container-form-race">

                <form action="" method="post"
                    onSubmit={letsGo}>
                    <div className="form-par">
                        <h3>click as much as possible to win.
                            minimum click to win: 80</h3>
                        <label htmlFor="credit">How many credit (s) do you want to bet?</label>
                        <input type="number"
                            onChange={handleChangeMise} defaultValue='50' min='50' max={getUser.credit} />
                    </div>

                    <button type="submit">Let's Go!!</button>
                </form>
            </div>
        </div>
    )
}

export default ClickerMain