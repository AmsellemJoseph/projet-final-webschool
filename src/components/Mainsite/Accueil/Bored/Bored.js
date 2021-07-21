import React, { useState, useEffect } from 'react'
import './style.css';

const Bored = () => {

    const [citation, setCitation] = useState('')

    useEffect(() => {

        const getBored = async () => {

            const URL = ('http://www.boredapi.com/api/activity/')
            const res = await fetch(URL)
            const response = await res.json()
            setCitation(response.activity)

        }
        getBored()

    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="bored-container">
            <h4>Get bored?</h4>
            <p>{citation}</p>
            <p>or better</p>
        </div>
    )
}

export default Bored