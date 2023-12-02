import React, {useState, useRef, useEffect} from 'react'
import socket from '../SocketConfig'

const Form = ({isOpen, isOver, gameID}) => {

    const [userInput, setUserInput] = useState("")
    const textInput = useRef(null)

    useEffect(()=> {
        if(!isOpen) {
            textInput.current.focus()
        }
    }, [isOpen])

    const resetForm = () => {
        setUserInput("")
    }

    const onChange = (e) => {
        let value = e.target.value
        let lastChar = value.charAt(value.length - 1)

        if (lastChar === " ") {
            socket.emit('userInput', {userInput, gameID})
            resetForm()
        } else {
            setUserInput(e.target.value)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("yes")
            event.preventDefault(); // Prevent the default form submission behavior
            // You can add custom logic here if needed
        }
    }

    return (
        <div className='row my-3'>
            <div className='col-sm'></div>
            <div className='col-sm-4'>
                <form>
                    <div className="form-group">
                        <input type="text" readOnly={isOpen || isOver} onChange={onChange} onKeyDown={handleKeyDown} onSubmit={(e)=>{e.preventDefault();}} value={userInput} className="form-control" ref={textInput} placeholder='Type text here'/>
                    </div>
                </form>
            </div>
            <div className='col-sm'></div>
        </div>
    )
}

export default Form