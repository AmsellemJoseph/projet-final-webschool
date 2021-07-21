import React, { useState, useEffect } from 'react';
import MainBarUser from '../NavBarUser/MainBarUser'
import { useHistory } from 'react-router-dom'
import PaypalCredit from './PaypalCredits'
import './style.css'
const axios = require('axios')
const PaypalComp = () => {

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
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const [checkout, setCheckout] = useState(false)
    const [choice, setChoice] = useState({ price: 0, credit: 0 })

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (choice == 10) {
            setChoice({ price: 10, credit: 100 })
        } else if (choice == 20) {
            setChoice({ price: 20, credit: 250 })
        } else if (choice == 40) {
            setChoice({ price: 40, credit: 500 })
        } else if (choice == 80) {
            setChoice({ price: 80, credit: 1250 })
        }
        setCheckout(true)

    }

    return (
        <div>
            <MainBarUser />
            {checkout ? <PaypalCredit choice={choice} /> : (<div className="main-form-choix-paypal"><form classname="form-choix-paypal" action="" method="post" onSubmit={handleSubmit}>
                <h2>Choose how many credits you want to buy</h2>
                <div className="radio-paypal">
                    <input type="radio" onChange={(e) => setChoice(e.target.value)} value="10" name="credit" id="100credits" />
                    <label htmlFor="100credits">100 credits - 10nis</label>
                </div>
                <div className="radio-paypal">
                    <input type="radio" onChange={(e) => setChoice(e.target.value)} value="20" name="credit" id="250credits" />
                    <label htmlFor="250credits">250 credits - 20nis</label>
                </div>
                <div className="radio-paypal">
                    <input type="radio" onChange={(e) => setChoice(e.target.value)} value="40" name="credit" id="500credits" />
                    <label htmlFor="500credits">500 credits - 40nis</label>
                </div>
                <div className="radio-paypal">
                    <input type="radio" onChange={(e) => setChoice(e.target.value)} value="80" name="credit" id="1000credits" />
                    <label htmlFor="1000credits">1250 credits - 80nis</label>
                </div>
                <button type="submit">Checkout</button>
            </form></div>)}

        </div>
    )
}

export default PaypalComp