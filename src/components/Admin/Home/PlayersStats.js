import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';

import './style.css'


const axios = require('axios')

const PlayersStats = () => {

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
                        <tr>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Username</td>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Nbr connections</td>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Total credits</td>
                        </tr>
                        {users.length?
                        users.map((user,i)=>{
                            return<tr key={i}>
                            <td style={{ display:'flex',justifyContent:'space-between',alignItems: 'center',fontSize:'14px'}}>{user.username}</td>
                            <td style={{fontSize:'14px'}}>{user.nbrConnection}</td>
                            <td style={{fontSize:'14px'}}>{user.credit}</td>
                        </tr>
                        })
                        :null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayersStats