import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import SideBar from './SideBar'
import './styleNavBarUser.css'

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

    return (
        <div className="container-main-bar-user">
            <NavBar />
            <SideBar />
        </div>
    )
}

export default MainBarUser