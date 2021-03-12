import { useEffect, useState } from 'react'

const Chatbox = props => {
    const [message, setMessage] = useState("")
    const [msgHistory, setMsgHistory] = useState([])
    
    useEffect(() => {
        if(!props.socket) {
            console.log('no socket is available')
            return;
        }
        console.log('success socket?')
        props.socket.on('chat message', msg => addToMsgHistory(msg))
    }, [props.socket])

    const addToMsgHistory = msg => {
        console.log('something happened', msg)
        setMsgHistory(prev => [{
            username: msg.username,
            content: msg.content
        }, ...prev])
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.socket.emit('chat message', {
            username: props.username,
            content: message
        })
        setMessage('')
    }

    const handleChange = e => { setMessage(e.target.value) }

    return <div className="chatbox">
        <div className="chatarea">
            {msgHistory.map((msg, idx) => <p key={idx}>{msg.username} says: {msg.content}</p>)}
        </div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={message}
                onChange={handleChange}
            />
            <input type="submit" />
        </form>
    </div>
}

export default Chatbox