import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './style.css'
const axios = require('axios')

const PaypalCredit = ({ choice }) => {

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

    const history = useHistory();
    const price = choice.price
    const credit = choice.credit
    const user = JSON.parse(localStorage.getItem('user'))
    const mail = user.mail
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Credit for funny game!!",
                            amount: {
                                currency_code: "ILS",
                                value: price
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                // const order = await actions.order.capture()
                const setCred = await axios.put('http://localhost:2108/registration/setcredits', { params: { mail, credit } })
                if (setCred) {
                    history.push('/')
                }
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="main-form-choix-paypal">
            <div className="payment-choice">
                <h2>Choose your payment method</h2>
                <div ref={paypal}></div>
            </div>
        </div>
    )
}

export default PaypalCredit