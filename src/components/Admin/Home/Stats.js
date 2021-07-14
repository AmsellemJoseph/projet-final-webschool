import React, { useState, useEffect } from 'react'
import './style.css'

const axios = require('axios')

const Stats = (props) => {

    const [nbr, setNbr] = useState({
        nameGame: 0,
        nbrTotal: 0,
        usename: 0
    })
    const [win, setWin] = useState({})

    useEffect(() => {
        const getStats = async () => {
            const nameGame = props.nameGame
            const nbrTotal = await axios.get("http://localhost:2108/registration/getnbr", { params: { nameGame } })
            const coll = props.coll
            const win = await axios.get("http://localhost:2108/registration/getwin", { params: { coll } })
            setNbr({
                nameGame: nbrTotal.data.nameGame,
                usename: nbrTotal.data.usename,
                nbrTotal: nbrTotal.data.nbrTotal,
            })
            setWin(win.data)
        }
        getStats()
    }, [])

    console.log(win)


    return (
        <div className="main-container-stat">
            <div className="container-info">
                <table style={{margin:'auto'}}>
                    <thead>
                    <tr>
                        <th colSpan="3">
                            {nbr.usename}
                        </th>
                    </tr>
                    <tr>
                        <th colSpan="3">
                            Total games played: {nbr.nbrTotal}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Player</td>
                            <td>Credits won</td>
                            <td>Date</td>
                        </tr>
                    {win.length ? win.map((map,i) => {
                        const formData = new Date(map.date)
                        return <tr key={i}>
                            <td>{map.username}</td>
                            <td>{map.gain}</td>
                            <td>{formData.toLocaleDateString()}</td>
                        </tr>
                           
                        }) : null}
                        </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stats