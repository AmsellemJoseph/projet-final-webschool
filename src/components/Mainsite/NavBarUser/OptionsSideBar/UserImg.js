import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
const axios = require('axios')

const UserImg = ()=>{

    const [imgUser,setImgUser] = useState("")

    useEffect(() => {
        const recupImg = async()=>{
            const mailU = JSON.parse(localStorage.getItem('user'))
            const mail = mailU.mail
            const getInfo = await axios.post('http://localhost:2108/registration/getuser',{params: { mail}})
            setImgUser(getInfo.data[0].profilPic)
        }
        recupImg()
    })


    return(
        <div style={{marginTop:"50px"}}>
            <Avatar style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + `uploads/${imgUser}`}/>
        </div>
    )
}

export default UserImg;