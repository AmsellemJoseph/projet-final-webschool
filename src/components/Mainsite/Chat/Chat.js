import React, { useState, useEffect, useRef } from 'react';
import MainBarUser from '../NavBarUser/MainBarUser'
import Avatar from '@material-ui/core/Avatar';
import './style.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyCxl7LiMMQh5g23L0SYrJsumn6kJo4euao",
    authDomain: "fir-chat-webschool.firebaseapp.com",
    projectId: "fir-chat-webschool",
    storageBucket: "fir-chat-webschool.appspot.com",
    messagingSenderId: "314345594709",
    appId: "1:314345594709:web:97156c969221436dfa19dc"
})

const auth = firebase.auth();
const firestore = firebase.firestore()
const axios = require('axios')


const Chat = () => {

    const { username, mail } = JSON.parse(localStorage.getItem('user'))
    const [user] = useAuthState(auth)
    const [localUser, setLocalUser] = useState({})

    useEffect(() => {

        const getInfoUser = async () => {
            const getUser = await axios.post('http://localhost:2108/registration/getuser', { params: { mail } })
            setLocalUser(getUser.data[0])
        }
        getInfoUser();

    }, [])//eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className="main">
            <MainBarUser />
            <div>
            
                {user ? (<div className="chatroom"><SignOut /><Chatroom /></div>) : <div className="signin-chatroom"><SignIn /></div>}
                
            </div>
        </div>
    )

    function SignIn() {
        // const signInWithGoogle = () => {
        //     const provider = new firebase.auth.GoogleAuthProvider();
        //     auth.signInWithPopup(provider)
        // }
        // return <button onClick={signInWithGoogle} >Sign in with Google</button>
        const signInAnonymously = () => {
            // const provider = new firebase.auth().signInAnonymously()
        }
        return <button className="signin-button" onClick={signInAnonymously} >Sign in </button>
    }
    function SignOut() {
        return auth.currentUser && (
            <button className="signout-button" onClick={() => auth.signOut()} >Sign Out</button>
        )
    }
    function Chatroom() {

        const [formValue, setFormValue] = useState('');


        const sendMessage = async (e) => {
            e.preventDefault();

            // const { uid } = auth.currentUser;

            await messagesRef.add({
                text: formValue,
                sender: username,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: username,
                photoURL: process.env.PUBLIC_URL + `uploads/${localUser.profilPic}`
            })

            setFormValue('');
        }

        const messagesRef = firestore.collection("messages")
        const query = messagesRef.orderBy('createdAt').limitToLast(25)
        const [messages] = useCollectionData(query, { idField: 'id' })
        const messagesEndRef = useRef(null)




        return (<>
            <ScrollToBottom className="container-main-chatroom">

                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={messagesEndRef} />
            </ScrollToBottom>
            <form onSubmit={sendMessage}>
                <div className="text-form">
                    <input value={formValue}  onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                    <button type="submit"  disabled={!formValue}><FontAwesomeIcon icon={['fas','paper-plane']} style={{width:'100%'}} /></button>
                </div>
            </form>
        </>)
    }
    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;


        return (
            <div className="container-message">
                <div className={uid === username ? "message" : "message-g"}>
                    <div className={uid === username ? "inbl" : "inbl-g"}>
                        <div className={uid === username ? "infos-sender" : "infos-sender-g"}>
                            <Avatar className={username ? 'img-sender' : 'img-sender-g'} src={photoURL} />
                            <p className="user">{uid}</p>
                        </div>
                        <p className="text">{text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat