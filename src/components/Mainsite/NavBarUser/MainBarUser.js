import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import SideBar from './SideBar'
import './styleNavBarUser.css'
const axios = require('axios')

const MainBarUser = () => {

    const { sidebar } = useSelector(state => ({
        ...state.navBarUserReducer
    }))
    const dispatch = useDispatch();

    const open = () => {
        dispatch({
            type: "TOGGLENAVUSER"
        })
    }

    const close = () => {
        dispatch({
            type: "CLOSENAVUSER"
        })
    }
    const [getUser,setUser] = useState({})
    useEffect(()=>{
        const recup = async()=>{
            const userTemp = JSON.parse(localStorage.getItem('user'))
            const mail = userTemp.mail
            const user = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } });
            setUser(user.data[0]);
        }
        recup()

    },[])

    console.log(getUser.profilPic)

    return (
        <div className="container-main-bar-user">
            <NavBar getUser={getUser}/>
            <SideBar pic={getUser.profilPic} />
        </div>
    )
}

export default MainBarUser