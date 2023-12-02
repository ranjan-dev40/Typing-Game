import React, {useState} from 'react'
import socket from '../SocketConfig'

const JoinGame = (props) => {
    const [userInput, setUserInput] = useState({gameID: "", userName: ""});
    const onChange = (e) => {
        setUserInput({...userInput, [e.target.name] : e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        socket.emit('join-game', userInput)
    }

    return (
        <div style={{height: "69vh"}} className='container-fluid d-flex flex-column align-items-center justify-content-center'>
            <div style={{background: "white",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className='d-flex flex-column py-4 rounded-4 p-5 mt-5 align-items-center'>
                <div className='mb-2'>
                    <h2>Join a Game</h2>
                </div>
                <div>
                    <form className='d-flex flex-column align-items-center' onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='gameID' className='mb-2 fw-bold'>Game ID</label>
                            <input className='form-control' type="text" name='gameID' value={userInput.gameID} onChange={onChange} placeholder='Enter Game ID'/>
                        </div>
                        <div className='mt-3 mb-2 form-group'>
                            <label htmlFor='userName' className='mb-2 fw-bold'>User Name</label>
                            <input className='form-control' type="text" name='userName' value={userInput.userName} onChange={onChange} placeholder='Enter User Name'/>
                        </div>
                        <button type='submit' className='btn btn-sm btn-primary mt-3'>Join Game</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinGame