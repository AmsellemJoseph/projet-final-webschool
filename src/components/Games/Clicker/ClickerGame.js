import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './style.css'


const ClickerGame = () => {

    const history = useHistory();
    const [countDown, setCountDown] = useState(15)

    const { clickCount } = useSelector(state => ({
        ...state.clickerReducer
    }))
    console.log(clickCount)

    const dispatch = useDispatch();

    const clickButton = (e) => {
        console.log(e.target.key)
        // KeyboardEvent.repeat(false)
        dispatch({
            type: 'ADDCLICKGAME'
        })
    }

    const handleKey = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        const timeCount = () => {
            var x = null
            x = setTimeout(() => {
                setCountDown(countDown - 1);
            }, 1000)
            if (countDown === 0) {
                clearTimeout(x)
                history.push('/clickerresult')
            }
        }
        timeCount()
    }, [countDown])


    return (
        <div className="container-game">
            <h2 className="number-clicks">Countdown: {countDown}s</h2>
            <h2 className="number-clicks">Number of clicks: {clickCount}</h2>
            {/* <div onClick={clickButton} className="button-push"></div> */}
            <button className="button-push" onKeyPress={handleKey} onClick={clickButton}></button>
        </div>
    )
}

export default ClickerGame