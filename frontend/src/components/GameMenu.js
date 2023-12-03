import React from 'react'
import { useNavigate } from 'react-router-dom'
import socket from '../SocketConfig'

const GameMenu = () => {
    let navigate = useNavigate()

    const onCLickImageGame = () => {
        socket.emit('getimage')
        navigate('/imagegame')
    }
  return (
    <>
        <div className='text-center'>
            <div style={{height: "10rem"}}></div>
            <h1 style={{fontWeight: "700"}}>Welcome to Typing Game</h1>
            {/* mr-3 is m-3 in bootstrap 5*/}
            <button type="button" className='btn btn-primary btn-lg m-3' onClick={()=>{navigate('/game/create')}}>
                Create Game
            </button>
            <button type="button" className='btn btn btn-outline-secondary btn-lg' onClick={()=>{navigate('/game/join')}}>
                Join Game
            </button>
            <div>
                <button className='btn btn-outline-danger btn-lg' onClick={onCLickImageGame}>Image Typing</button>
            </div>
        </div>
    </>
  )
}

export default GameMenu