import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'


const ClickerCount = () => {

    const history = useHistory();
    const [count, setCount] = useState(3)

    const { clickCount, miseClick, clicker } = useSelector(state => ({
        ...state.clickerReducer,
        ...state.gameLauncherReducer
    }))

    useEffect(() => {
        const setGame = () => {
            if (!clicker) {
                history.push('/')
            }
        }
        setGame();
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        var x = null
        x = setTimeout(() => {
            setCount(count - 1);
        }, 1000)
        if (count === -1) {
            clearTimeout(x)
            history.push('/clickergame')
        }
    }, [count])//eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className="container-game">
            <h2 className="count-game">{count === 0 ? 'GO!!' : count}</h2>
        </div>
    )
}

export default ClickerCount