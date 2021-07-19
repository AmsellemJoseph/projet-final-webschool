import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import MainBarUser from '../../Mainsite/NavBarUser/MainBarUser'
import './style.css'
import ChangeProfilPicture from './logic';

import CircularIndeterminate from '../../../utils/CircularIndeterminate'


const axios = require('axios')

const ChangeInfo = () => {

    const history = useHistory();
    const { loading } = useSelector(state => ({
        ...state.loadingReducer
    }))

    const dispatch = useDispatch();

    const load = () => {
        dispatch({
            type: "LOADING"
        })
    }
    const stopLoad = () => {
        dispatch({
            type: "LOADED"
        })
    }

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const mailCredit = mail.mail
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.clear()
                history.push('/login')
            }
        }
        tok()
    }, [])

    const [newPic, setNewPic] = useState(null);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState('')

    const handleSubmit = async () => {
        load()
        const ChangePicture = new ChangeProfilPicture(newPic);
        const verifNull = ChangePicture.verifNull();
        if(!verifNull){
            stopLoad()
            return setError("Please choose a picture")
        }
        const type = ChangePicture.verifType();
        if (!type) {
            stopLoad()
            return setError("Please use .jpg/.jpeg or .png format only.")
        }
        const size = ChangePicture.verifSize();
        if (!size) {
            stopLoad()
            return setError("Please choose an image of a size less than 5mo.")
        }
        const sending = await ChangePicture.changeImage();
        if (!sending) {
            stopLoad()
            return setError("An error occurred, please try again later")
        } else {
           await ChangePicture.sendDB(sending);
        }
        stopLoad()
        setError("");
        history.push('/accueil')
    }


    const handleChange = (e) => {
        setNewPic(e.target.files[0]);
    }

    return (
        <div className="main-container-change-photo">
            <MainBarUser />
            <div className="container-form-change-photo">
                <form action="" method="post">
                    <h2>Choose your profile picture</h2>
                    <p style={{ color: '#0d122f',marginBottom:'20px' }}>{error}</p>
                    <p style={{ color: '#f3ef83' }}>{success}</p>
                    {loading ? <CircularIndeterminate /> : null}
                    <input className="custom-file-input" onChange={handleChange} type="file" name="profilPicture" />
                    <button onClick={handleSubmit} type="button">Upload your profile picture</button>
                </form>
            </div>
        </div>
    )
}

export default ChangeInfo