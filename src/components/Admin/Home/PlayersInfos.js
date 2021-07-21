import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';

import './style.css'


const axios = require('axios')

const PlayersInfos = () => {

    const [users, setUsers] = useState([])
    const [userTemp, setUserTemp] = useState([])

    useEffect(() => {

        const getAllUsers = async () => {
            const user = await axios.get('http://localhost:2108/registration/allUsers');
            setUserTemp(user.data)
            console.log(userTemp)

        }
        getAllUsers();
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        const filtUser = () => {
            const filt = userTemp.filter((user) => {
                return user.username !== 'admin'
            })
            setUsers(filt);
        }
        filtUser()

    }, [userTemp])//eslint-disable-line react-hooks/exhaustive-deps


    console.log(users)


    return (
        <div className="main-container-users">
            <div className="container-info">
                <table style={{ margin: 'auto' }}>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Username</td>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Creation date</td>
                            <td style={{ fontWeight: 'bold', fontSize: "14px" }}>Last connection</td>
                        </tr>
                        {users.length?
                        users.map((user,i)=>{
                                const createDate = new Date(user.created)
                                const lastDate = new Date(user.lastConnection)
                            return<tr key={i}>
                            <td style={{ display:'flex',justifyContent:'space-between',alignItems: 'center',fontSize:'14px'}}><Avatar style={{width:'25px',height:'25px',marginRight:'5px'}} src={process.env.PUBLIC_URL + `uploads/${user.profilPic}`}/> <span style={{marginRight:'5px'}}>{user.username}</span></td>
                            <td style={{fontSize:'14px'}}>{createDate.toLocaleDateString()}</td>
                            <td style={{fontSize:'14px'}}>{lastDate.toLocaleDateString()}</td>
                        </tr>
                        })
                        :null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayersInfos