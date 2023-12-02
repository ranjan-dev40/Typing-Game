import React from 'react'
import { redirect as Redirect} from 'react-router-dom'
import Countdown from './Countdown'
import StartBtn from './StartBtn'
import socket from "../SocketConfig"
import DisplayWords from './DisplayWords'
import Form from './Form'
import ProgressBar from './ProgressBar'
import ScoreBoard from './ScoreBoard'
import DisplayGameCode from './DisplayGameCode'


const findPlayer = (players) => {
    return players.find((player) => player.socketID === socket.id)
}

const TypingGame = (props) => {

    const { gameState } = props
    const { _id, players, wordArray, isOpen, isOver } = gameState
    const player = findPlayer(players)

    if (_id === "") {
        return (<Redirect to="/"/>)
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <DisplayWords wordArray={wordArray} player={player} gameID={_id}/>
                <Form isOpen={isOpen} isOver={isOver} gameID={_id}/>
                <Countdown></Countdown>
                <StartBtn player={player} gameID={_id}></StartBtn>
                <ProgressBar players={players} player={player} wordsLength={wordArray.length}/>
                <DisplayGameCode gameID={_id}/>
                <ScoreBoard players={players}/>
            </div>
        </>
    )
}

export default TypingGame