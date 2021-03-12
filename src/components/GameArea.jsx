import { useEffect, useState } from "react"

const GameArea = props => {
    const [circles, setCircles] = useState([])

    useEffect(() => {
        if(!props.socket) return;
        props.socket.on('add-circle', data => addCircle(data))
        props.socket.on('clear-display', () => setCircles([]))
    }, [props.socket])

    const addCircle = ({username, x, y, dia, rgba}) => {
        let styles = {
            left: x - Math.floor(dia / 2 + 0.5) + "px",
            top: y - Math.floor(dia / 2 + 0.5) + "px",
            width: dia + "px",
            height: dia + "px",
            backgroundColor: rgba,
            lineHeight: dia + "px"
        }
        let el = <div style={styles} className="circle">{username}</div>
        setCircles(prev => [...prev, el])
    }

    const handleClick = e => {
        props.socket.emit("add-circle", {
            username: props.username,
            x: e.clientX,
            y: e.clientY,
            dia: randomBetween(10, 120),
            rgba: getRandomRGBA()
        })
    }
    
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function getRandomRGBA() {
        let r = randomBetween(0, 255)
        let g = randomBetween(0, 255)
        let b = randomBetween(0, 255)
        let a = randomBetween(3, 10) / 10
        return `rgba(${r},${g},${b},${a})`
    }
    const clearDisplay = () => {
        props.socket.emit('clear-display')
    }

    const circleDivs = circles.map((circle, idx) => <span key={idx}>{circle}</span>)
    return (
        <div className="gamearea" onClick={handleClick}>
            <button onClick={clearDisplay}>Clear</button>
            {circleDivs}
        </div>
    )
}

export default GameArea