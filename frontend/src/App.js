import React, {useEffect, useState} from 'react'
import {
  Routes,
  Route
} from "react-router-dom"
// import history from "./history"
import GameMenu from './components/GameMenu';
import CreateGame from './components/CreateGame';
import socket from './SocketConfig';
import JoinGame from './components/JoinGame';
import TypingGame from './components/TypingGame'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState({_id: "", isOpen: false, players: [], wordArray: []})

  useEffect(()=>{
     socket.on('updateGame', (game) => {
        setGameState(game)
     })

     return () => {
      socket.removeAllListeners()
     }
  },[])

  useEffect(()=>{
    if (gameState._id !== "") {
      // history.push(`/game/${gameState._id}`)
      navigate(`/game/${gameState._id}`)
    }
    //eslint-disable-next-line
  }, [gameState._id])

  return (
    <>
      {/* <Router history={history}>
          </Router> */}
        <Navbar></Navbar>
        <div style={{height: "5rem"}}></div>
        <Routes>
          <Route exact path="/" element={<GameMenu/>} />
          <Route exact path="/game/create" element={<CreateGame/>} />
          <Route exact path="/game/join" element={<JoinGame/>} />
          {/* <Route exact path="/game/:gameID" render={(props) => {
          <TypingGame {...props} gameState={gameState}/>
          }}
          /> */}
          <Route exact path="/game/:gameID" element={<TypingGame gameState={gameState}/>} />
        </Routes>
    </>
  );
}

export default App;