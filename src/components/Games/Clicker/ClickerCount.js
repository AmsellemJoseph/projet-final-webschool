import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import './style.css'


const ClickerCount = () => {

    const history = useHistory();
    const [count,setCount] = useState(3)

    const {clickCount} = useSelector(state => ({
        ...state.clickerReducer
    }))
    console.log(clickCount)

    useEffect(()=>{
        var x=null
        x = setTimeout(() => {
            setCount(count-1);
        },1000)
        if(count===-1){
            clearTimeout(x)
            history.push('/clickergame')
        }
    },[count])



    return (
        <div className="container-game">
            <h2 className="count-game">{count===0?'GO!!':count}</h2>
        </div>
    )
}

export default ClickerCount