import React from 'react'
import { useNavigate } from 'react-router-dom'

const GameMenu = () => {
    let navigate = useNavigate()
  return (
    <>
        <div className='text-center'>
            <div style={{height: "10rem"}}></div>
            <h1 style={{fontWeight: "700"}}>Welcome to Typing Game</h1>
            {/* mr-3 is m-3 in bootstrap 5*/}
            <button type="button"  className='btn btn-primary btn-lg m-3' onClick={()=>{navigate('/game/create')}}>
                Create Game
            </button>
            <button type="button" className='btn btn btn-outline-secondary btn-lg' onClick={()=>{navigate('/game/join')}}>
                Join Game
            </button>
        </div>
    </>
  )
}

export default GameMenu