import React from 'react'

const ButtonChat = ({ onClick = null, children = null }) => (
    <button onClick={onClick}>{children}</button>
)

export default ButtonChat