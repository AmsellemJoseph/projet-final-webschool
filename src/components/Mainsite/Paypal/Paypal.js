import React, { useRef, useEffect } from 'react';

const Paypal = () => {

    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "ILS",
                                value: 650.00
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
            },
            onError:(err)=>{
                console.log(err)
            }
        }).render(paypal.current)
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal