import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import MainBarAdmin from '../NavBarAdmin/MainBarAdmin'
import UserDates from './UsersInfos/UserDates'
import UserGames from './UsersInfos/UserGames'

import './style.css'
const axios = require('axios')

const Admin = () => {

    const history = useHistory();


    // const [tableaux] = useState([
    //     {
    //         titre: 'Users',
    //         headCells: [
    //             { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
    //             { id: 'created', numeric: false, disablePadding: true, label: 'Created' },
    //             { id: 'last', numeric: false, disablePadding: true, label: 'Last connection' },
    //             { id: 'nbrConnection', numeric: true, disablePadding: true, label: 'Nbr of Connections' },
    //         ],
    //         rows: [
    //             users.map((user,i) => {
    //                 return {
    //                     key:i,
    //                     n0:user.username,
    //                     n1:user.created,
    //                     n2:user.lastConnection,
    //                     n3:user.nbrConnection
    //                 }
    //             })
    //         ]
    //     },
    // ])


    useEffect(() => {
        const verifAdmin = async () => {
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
        verifAdmin();


    }, [])//eslint-disable-line react-hooks/exhaustive-deps





    return (
        <div className="main-container-admin-page">
            <MainBarAdmin />
            <div className="main-container-users-tab">
                <UserDates />
                <UserGames />
                {/* <TableBase/> */}

            </div>

        </div>
    )
}

export default Admin