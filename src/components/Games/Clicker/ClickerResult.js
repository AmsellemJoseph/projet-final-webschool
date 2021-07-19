import React from 'react';
import { useSelector } from 'react-redux';

const ClickerResult = ()=>{

    const {clickCount} = useSelector(state => ({
        ...state.clickerReducer
    }))

    return(
        <div>
            <h2>{clickCount}</h2>
        </div>
    )
}

export default ClickerResult