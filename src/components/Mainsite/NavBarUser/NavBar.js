import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import './styleNavBarUser.css'


const NavBarUser = ({ getUser }) => {


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
            {sidebar ? <p><FontAwesomeIcon onClick={open} icon={['fas', 'times']} style={{ fontSize: '38px', cursor: 'pointer',marginLeft:'5px' }} /></p> : <p><FontAwesomeIcon onClick={open} icon={['fas', 'bars']} style={{ fontSize: '38px', cursor: 'pointer',marginLeft:'5px' }} /></p>}

            <p>Hi {getUser.username}!</p>
            <p style={{ marginRight: '25px' }}>You have {getUser.credit} credit(s) - <a style={{ color: "#f3ef83" }} href="/paypal">Buy more</a></p>
            <div className='picnav'>
                <Avatar style={{ marginRight: '25px' }} src={process.env.PUBLIC_URL + `uploads/${getUser.profilPic}`} />
            </div>
        </div>
    )
}

export default NavBarUser