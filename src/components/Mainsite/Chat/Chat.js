import React, { useState, useEffect, useRef } from 'react';
import MainBarUser from '../NavBarUser/MainBarUser'
import Avatar from '@material-ui/core/Avatar';
import './style.css'

import ButtonChat from './ButtonChat'

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

const Chat = () => {

    const {username} = JSON.parse(localStorage.getItem('user'))
    const [user] = useAuthState(auth)


    return (
        <div className="main">
            {/* <MainBarUser /> */}
            <div>
                {user ? <Chatroom /> : <SignIn />}
                <SignOut/>
            </div>
        </div>
    )

    function SignIn() {
        // const signInWithGoogle = () => {
        //     const provider = new firebase.auth.GoogleAuthProvider();
        //     auth.signInWithPopup(provider)
        // }
        // return <button onClick={signInWithGoogle} >Sign in with Google</button>
        const signInAnonymously = ()=>{
            const provider = new firebase.auth().signInAnonymously()
        }
        return <button onClick={signInAnonymously} >Sign in </button>
    }
    function SignOut() {
        return auth.currentUser && (
            <button onClick={() => auth.signOut()} >Sign Out</button>
        )
    }
    function Chatroom() {

        const [formValue, setFormValue] = useState('');


        const sendMessage = async (e) => {
            e.preventDefault();

            // const { uid } = auth.currentUser;

            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid:username,
                photoURL:process.env.PUBLIC_URL + `uploads/default.jpg`
            })

            setFormValue('');
        }

        const messagesRef = firestore.collection("messages")
        const query = messagesRef.orderBy('createdAt').limitToLast(25)
        const [messages] = useCollectionData(query, { idField: 'id' })
        return (<>
            <main>
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            </main>
            <form onSubmit={sendMessage}>

                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                <button type="submit" disabled={!formValue}>🕊️</button>

            </form>
        </>)
    }
    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;

        const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

        return (
            <div className={`message ${messageClass}`} >
                <Avatar src={photoURL} />
                <p>{text}</p>
            </div>
        )
    }
}

export default Chat