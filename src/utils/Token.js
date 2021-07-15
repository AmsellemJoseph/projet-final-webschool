import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
const axios = require('axios')

const Token = () => {
    const history = useHistory();

    useEffect(() => {
        const tok = async () => {

            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
                history.push('/accueil')
            } else {
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    return (
        <>
        </>
    )
}

export default Token