import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css'

const axios = require('axios')

const TodoList = () => {

    const [todo, setTodo] = useState({});
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState('')

    const handleFlag = () => {
        setFlag(!flag)
    }

    useEffect(() => {

        const getAllSql = async () => {

            const resTemp = await axios.get('http://localhost:2108/registration/getallsql')
            console.log(resTemp.data)
            setTodo(resTemp.data)
        }
        getAllSql()
    }, [flag])

    console.log(todo)

    const inputs = useRef([])

    const addInput = (elements) => {
        if (elements && !inputs.current.includes(elements)) {
            inputs.current.push(elements)
        }
    }

    const handleRemove = async (e) => {
        console.log(e.target.parentNode.parentNode.id)
        const id = e.target.parentNode.parentNode.id
        const del = await axios.delete('http://localhost:2108/registration/deletetodo', { params: { id } })
        if (del) {
            handleFlag();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var title = inputs.current[0].value;
        var text = inputs.current[1].value;
        if (!title || !text) {
            return setError("Please fill all fields")
        }
        if(title.includes('<')|| text.includes('<')){
            inputs.current[0].value = "";
            inputs.current[1].value = "";
            return setError("Please don't inject me!!!")
        }
        setError('')
        const mess = await axios.post('http://localhost:2108/registration/sendtodo', { params: { title, text } })
        if (mess) {
            setError('')
            inputs.current[0].value = "";
            inputs.current[1].value = "";
            return handleFlag()
        }
    }

    return (
        <div className="main-container-todo">
            <div className="container-all">
                {todo.length > 0 ? (todo.map((todo) => {
                    return <div key={todo.id} className="container-message-todo">
                        <div className="container-titre">
                            <p>{todo.title} </p>
                            <p  ><span id={todo.id} onClick={handleRemove} className="delete-icone"><DeleteIcon /></span></p>
                        </div>
                        <div className="container-text">
                            <p>{todo.text}</p>
                        </div>
                    </div>
                })) : <div className="container-message-todo"><p>No notes to display</p></div>}
            </div>
            <div className="container-input-message">
                <p style={{ marginTop: '10px', fontSize: '18px', color: '#1a1e4d', fontFamily: 'Audiowide', }}>{error}</p>
                <div className="container-all-inputs-messages">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="input">
                            <input ref={addInput} type="text" name="title" id="" placeholder="Title" />
                        </div>
                        <div className="input">
                            <textarea ref={addInput} name="text" id="text" cols="2" rows="5" placeholder="Your message"></textarea>
                        </div>
                        <div className="input">
                            <button type="submit">Sending</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoList