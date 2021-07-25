import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import './styleNavBarUser.css'

const axios = require('axios')


const NavBarUser = ({ getUser }) => {

    const history = useHistory();

    useEffect(() => {
        const tok = async () => {
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
        tok()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    const { sidebar } = useSelector(state => ({
        ...state.navBarUserReducer,
    }))

    const dispatch = useDispatch();

    const open = () => {
        dispatch({
            type: "TOGGLENAVUSER"
        })
    }

    return (
        <div className="container-navbar-user">
            {sidebar ? <p><FontAwesomeIcon onClick={open} icon={['fas', 'times']} style={{ fontSize: '38px', cursor: 'pointer', marginLeft: '5px' }} /></p> : <p><FontAwesomeIcon onClick={open} icon={['fas', 'bars']} style={{ fontSize: '38px', cursor: 'pointer', marginLeft: '5px' }} /></p>}

            <p>Hi {getUser.username}!</p>
            <p style={{ marginRight: '25px' }}>You have {getUser.credit} credit(s) - <a style={{ color: "#f3ef83" }} href="/paypal">Buy more</a></p>
            <div className='picnav'>
                <Avatar style={{ marginRight: '25px' }} src={process.env.PUBLIC_URL + `uploads/${getUser.profilPic}`} />
            </div>
        </div>
    )
}

export default NavBarUser