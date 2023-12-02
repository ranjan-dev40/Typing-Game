import React, {useState, useEffect} from 'react'
import socket from '../SocketConfig'

const Countdown = (props) => {

    const [timer, setTimer] = useState({countDown : "", msg: ""})

    useEffect(()=>{
        socket.on('timer', (data) => {
            setTimer(data)
        })

        socket.on('done', () => {
            socket.removeListener('timer')
        })
    }, [])

    const {countDown, msg} = timer

  return (
    <>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>{countDown}</h1>
                <h3>{msg}</h3>
            </div>

        </div>
    </>
  )
}

export default Countdown