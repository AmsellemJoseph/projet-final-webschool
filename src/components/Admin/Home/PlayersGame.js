import React, { useState, useEffect } from 'react'

import './style.css'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
        maxWidth:620,
    },
});

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

    function createData(username, StarRace, Clicker, MoreorLess) {
        return { username, StarRace, Clicker, MoreorLess };
    }

    const rows = users.map((user, i) => {
        if (user.nbrRace === undefined) {
            user.nbrRace = 0
        }
        if (user.nbrClick === undefined) {
            user.nbrClick = 0
        }
        if (user.nbrMoreOrLess === undefined) {
            user.nbrMoreOrLess = 0
        }
        return createData(user.username, user.nbrRace, user.nbrClick, user.nbrMoreOrLess)
    })
    const classes = useStyles();

    console.log(rows)





    console.log(users)


    return (
        // <div className="main-container-users">
        //     <div className="container-info">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: "16px" }}>Username</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: "16px" }}>Star Race</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: "16px" }}>Clicker</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: "16px" }}>More or Less</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.username}>
                                <TableCell component='th' scope='row'>
                                    {row.username}
                                </TableCell>
                                <TableCell>{row.nbrRace}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
        //     </div>
        // </div>
    )
}

export default PlayersGame