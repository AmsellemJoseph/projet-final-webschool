import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
const axios = require('axios')
const PaypalComp = ()=>{

    useEffect(() => {
        const tok = async () => {
            const mail = JSON.parse(localStorage.getItem('user'))
            const tokenLocal = JSON.parse(localStorage.getItem('token'))
            if (!mail || !tokenLocal) {
                history.push('/login')
            }
            const mailCredit = mail.mail
            const tokTemp = await axios.post('http://localhost:2108/registration/gettoken', { params: { mail, tokenLocal } })
            if (tokTemp.data == 1) {
            } else {
                localStorage.setItem("token", JSON.stringify(""))
                localStorage.setItem("user", JSON.stringify(""))
                history.push('/login')
            }
        }
        tok()
    }, [])

    const [checkout,setCheckout]=useState(false)
    const [choice,setChoice] = useState("")

    const history = useHistory();

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(choice)
        if (choice==10){
            history.push('/paypal10credits')
        }else if(choice==20){
            history.push('/paypal20credits')
        }else if(choice==40){
            history.push('/paypal40credits')
        }else if(choice==80){
            history.push('/paypal80credits')
        }

    }

    return(
        <div>
            {/* {checkout?(<Paypal/>):(<button onClick={()=>setCheckout(true)}>Checkout</button>)} */}
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                <input type="radio" onChange={(e)=>setChoice(e.target.value)} value="10" name="credit" id="100credits" />
                <label htmlFor="100credits">100 credits - 10nis</label>
            </div>
            <div>
                <input type="radio" onChange={(e)=>setChoice(e.target.value)} value="20" name="credit" id="250credits" />
                <label htmlFor="250credits">250 credits - 20nis</label>
            </div>
            <div>
                <input type="radio" onChange={(e)=>setChoice(e.target.value)} value="40" name="credit" id="500credits" />
                <label htmlFor="500credits">500 credits - 40nis</label>
            </div>
            <div>
                <input type="radio" onChange={(e)=>setChoice(e.target.value)} value="80" name="credit" id="1000credits" />
                <label htmlFor="1000credits">1000 credits - 80nis</label>
            </div>
            <button type="submit">Checkout</button>
            </form>
        </div>
    )
}

export default PaypalComp