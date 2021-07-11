import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
const axios = require('axios')

const Paypal40 = () => {

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
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    const history = useHistory();
    const credit = 500
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
                                value: 40.00
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log("Success " + order)
                const setCred = await axios.put('http://localhost:2108/registration/setcredits', { params: { mail, credit } })
                if(setCred){
                    history.push('/')
                }
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal40