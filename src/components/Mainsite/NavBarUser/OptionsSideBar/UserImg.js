import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
const axios = require('axios')

const UserImg = ({pic})=>{

    return(
        <div style={{marginTop:"50px"}}>
            <Avatar style={{width:'100px',height:'100px'}} src={process.env.PUBLIC_URL + `uploads/${pic}`}/>
        </div>
    )
}

export default UserImg;