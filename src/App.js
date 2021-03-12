import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import Chatbox from './components/Chatbox'
import GameArea from './components/GameArea'

let socket = null;

const App = () => {
    const [username, setUsername] = useState("")
    
    useEffect(() => {
        // Ask the user for their name on page load
        const name = prompt('Please enter your initials')
        setUsername(name)
        
        // Setup socket connection 
        socket = io({
            query: {
                username: name
            }
        })
        // Clean up the effect (aka on component unmount, close the connection)
        return () => socket.disconnect();
    }, [])
    
    return <>
        <GameArea socket={socket} username={username} />
        <Chatbox socket={socket} username={username}/>
    </>
}


export default App