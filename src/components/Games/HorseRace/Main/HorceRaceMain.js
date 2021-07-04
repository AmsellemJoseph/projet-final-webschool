import React from 'react';
import NavBar from '../../../Mainsite/NavBarUser/NavBar'
import {useHistory} from 'react-router-dom'

const HorceRaceMain = ()=>{

    const history = useHistory();

    const verifLog = JSON.parse(localStorage.getItem('logged'))
    if (!verifLog || verifLog.logged == false) {
        history.push('/');
    }

    return(
        <div>
            <NavBar/>
            Salut
        </div>
    )
}

export default HorceRaceMain