import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from '../../../../utils/CircularIndeterminate'
import './style.css'

const axios = require('axios')

const Mailing = () => {

    const [mails, setMails] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMails = async () => {
            const users = await axios.get('http://localhost:2108/registration/allUsers')
            const arrTemp = [];
            users.data.forEach((user) => {
                arrTemp.push(user.mail)
            })
            setMails(arrTemp)
        }
        getMails()
    }, [])

    const inputs = useRef([])

    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const title = inputs.current[0].value
        const text = inputs.current[1].value

        if (!title || !text) {
            setLoading(false)
            return setError("Please fill all fields")
        }
        const mailing = await axios.post('http://localhost:2108/registration/mailingAdmin', { params: { mails, title, text } })
        if (!mailing) {
            setLoading(false)
            return setError("An error occurred, please try again later")
        }
        setLoading(false)
        return setError("Mails successfully sent")
    }



    return (
        <div className="main-container-todo">
            {/* <div className="container-all">
                <div className="container-message-todo">
                    <div className="container-titre">
                        <p>Title:</p>
                    </div>
                    <div className="container-text">
                        <p>Text:</p>
                        <p>{error}</p>
                    </div>
                </div>

            </div> */}
            <div className="container-input-message">
                <div className="container-all-inputs-messages">
                    <p style={{ marginBottom: "10px" }}>{error}</p>
                    {loading ? <CircularIndeterminate style={{ marginBottom: "10px" }} /> : null}
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="input">
                            <input ref={addInput} type="text" name="title" id="" placeholder="Title" />
                        </div>
                        <div className="input">
                            <textarea ref={addInput} name="text" id="text" cols="2" rows="5" placeholder="Your message"></textarea>
                        </div>
                        <div className="input">
                            <button type="submit">Sending</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Mailing