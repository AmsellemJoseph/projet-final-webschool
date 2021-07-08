import React, { useState } from 'react';
import './style.css'
const axios = require('axios')


const Test = () => {

    const [selectedFile, setSelectedFile] = useState(null)

    const onChangeHandler = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const onClickHandler = () => {
        console.log(selectedFile)
        const data = new FormData()
        data.append('file',selectedFile)
        axios.post('http://localhost:2108/registration/img',data,{

        })
        .then(res=>{
            console.log(res.statusText)
        })
        console.log(data)
    }


    return (
        <div>
            <form action="" method="post"
            // encType="multipart/form-data"
            // onSubmit={handleSubmit}
            >

                <input type="file" onChange={onChangeHandler} name="file" id="" />
                <button type="button" onClick={onClickHandler}>upload</button>

            </form>
        </div>
    )
}

export default Test