import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';

import './style.css'


const axios = require('axios')

const PlayersGame = () => {

    const [users, setUsers] = useState([])
    const [userTemp, setUserTemp] = useState([])

    useEffect(() => {

        const getAllUsers = async () => {
            const user = await axios.get('http://localhost:2108/registration/allUsers');
            setUserTemp(user.data)
            console.log(userTemp)

        }
        getAllUsers();
    }, [])

    useEffect(() => {

        const filtUser = () => {
            const filt = userTemp.filter((user) => {
                return user.username !== 'admin'
            })
            setUsers(filt);
        }
        filtUser()

    }, [userTemp])


    console.log(users)


    return (
        <div className="main-container-users">
            <div className="container-info">
                <table style={{ margin: 'auto' }}>
                    <tbody>
                        <tr style={{ width: '100%'}}>
                            <td style={{ fontWeight: 'bold', fontSize: "16px" }}>Username</td>
                            <td style={{ fontWeight: 'bold', fontSize: "16px" }}>Star Race</td>
                            <td style={{ fontWeight: 'bold', fontSize: "16px" }}>Clicker</td>
                        </tr>
                        {users.length?
                        users.map((user,i)=>{
                            return<tr key={i}>
                            <td style={{ display:'flex',justifyContent:'space-between',alignItems: 'center'}}>{user.username}</td>
                            <td>{user.nbrRace}</td>
                            <td>{user.nbrClick}</td>
                        </tr>
                        })
                        :null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayersGame