import Reactm, { useState } from 'react';
import NavBar from '../../../Mainsite/NavBarUser/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'

const HorceRaceMain = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { nbrHorse } = useSelector(state => ({
        ...state.horseReducer,
    }))
    const [part, setPart] = useState(2);
    const [mise, setMise] = useState(10);

    const verifLog = JSON.parse(localStorage.getItem('logged'))
    if (!verifLog || verifLog.logged == false) {
        history.push('/');
    }

    const handleChange = (e) => {
        setPart(e.currentTarget.value)
    }
    const handleHorses = (game)=>{
        dispatch({
            type:"SETHORSEGAME",
            payload:game
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const game = {
            nbrHorse:part,
            mise:mise
        }
        handleHorses(game)
        history.push('/horseracegame')
        
    }


    return (
        <div className="container">
            {/* <NavBar/> */}
            <h2>HORSE RACE GAME</h2>

            <form action="" method="post">
                <label htmlFor="credit">How many credit (s) do you want to bet?</label>
                <input type="number"
                    onChange={e => setMise(e.target.value)} />
                <label htmlFor="participants">How many participants do you want?</label>
                <select onChange={handleChange} name="participants">
                    <option value="2">Two horses</option>
                    <option value="3">Three horses</option>
                    <option value="4">Four horses</option>
                    <option value="5">Five horses</option>
                </select>
                <button onClick={handleSubmit} type="submit">Let's Go!!</button>
            </form>
        </div>
    )
}

export default HorceRaceMain