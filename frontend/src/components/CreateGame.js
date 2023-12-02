import React, {useState} from 'react'
import socket from '../SocketConfig'

const CreateGame = (props) => {
    const [settings, setSettings] = useState({userName: "", gameMode: "paragraph",language: "cpp", prompt: "50 words paragraph on any topic"});

    const onChange = (e) => {
        setSettings({...settings,[e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault()
        socket.emit('create-game',settings);
        // socket.emit('create-game',settings)
    }

    return (
        <div style={{height: "69vh"}} className='container-fluid d-flex flex-column align-items-center justify-content-center'>
            <div style={{background: "white",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className='d-flex flex-column py-4 rounded-4 p-5 mt-5 align-items-center'>
                <div className='mb-2'>
                    <h2>Create a Game</h2>
                </div>
                <div>
                    <form className='d-flex flex-column align-items-center' onSubmit={onSubmit}>
                        <div className='form-group mb-1'>
                            <label htmlFor='userName' className='mb-2 fw-bold'>User Name</label>
                            <input className='form-control' type="text" name='userName' value={settings.userName} onChange={onChange} placeholder='Enter User Name'/>
                            <label htmlFor="userOptions" className='mt-2 fw-bold mb-2'>Game Mode</label>
                            <select className='form-select' name='gameMode' value={settings.gameMode} onChange={onChange} placeholder='Choose Game'>
                                <option value="paragraph">Paragraph</option>
                                <option value="code">Code</option>
                            </select>
                            {settings.gameMode==="paragraph" &&
                                <div>
                                    <label htmlFor="prompt" className='mt-2 fw-bold mb-2'>Prompt</label>
                                    <input placeholder='Enter Topics' className='form-control' type="text" name='prompt' value={settings.prompt} onChange={onChange}/>
                                </div>
                            }
                            {settings.gameMode==="code" &&
                                <div>
                                    <label htmlFor="language" className='mt-2 fw-bold mb-2'>Language</label>
                                    <select className='form-select' name='language' value={settings.language} onChange={onChange} placeholder='Choose Game'>
                                        <option value="java">Java</option>
                                        <option value="cpp">C++</option>
                                        <option value="javascript">JavaScript</option>
                                    </select>
                                </div>
                            }
                        </div>
                        <button type='submit' className='btn btn-sm btn-primary mt-3'>Create Game</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateGame