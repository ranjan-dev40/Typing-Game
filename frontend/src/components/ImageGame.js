import React, { useEffect, useState } from 'react';
import socket from '../SocketConfig';
import spinner from "./spinner.gif"


const ImageGame = (props) => {
    const defaultResult = "Your mistakes and possible improvements will be visible here"
    const [data,setData]=useState("");
    const[image, setImage] = useState("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")
    const[timer, setTimer] = useState(200)
    const[startBtn, setStartBtn] = useState(false)
    const[submitBtn, setSubmitBtn] = useState(false)
    const[txtara, setTxtara] = useState(true)
    const[result, setResult] = useState("Your mistakes and possible improvements will be visible here")

    const changeData=(e)=>{
        setData(e.target.value);
    }

    const onClickStart = () => {
        setStartBtn(true) 
        setTxtara(false) 
    }

    const onClickSubmit = () => {
        setTimer(0)
        setSubmitBtn(true)
    }

    useEffect(() => {
        if (startBtn && timer > 0) {
            // Create a timer using setInterval
            const timerInterval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        
            // Clean up the timer when the component unmounts or when the timer reaches 0
            return () => clearInterval(timerInterval);
        }

        if (startBtn && timer === 0) {
            setTxtara(true)
            socket.emit('userpara', data)
        }

        // eslint-disable-next-line
      }, [timer, startBtn]);

    useEffect(()=>{
        socket.on('imgurl', async (imgurl) => {
            setImage(imgurl)
        })

        socket.on('gptpararesponse', async (data) => {
            setResult(data)
        })
    },[])

    useEffect(()=>{
        if (timer <= 0) {
            console.log("done")
        }
    },[timer])
    
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
            <div>
                <img style={{height: "35vh"}} src={image} alt="" />
            </div>
            <div>
                <h1>Test your writing skills</h1>
                <h3>Observe the given image and try to write your thoughts in the given time.</h3>
            </div>
            <div>
                <div className='d-flex flex-column pb-1 align-items-end'>
                    <p style={{margin:0}}>Time Remaining : {timer} seconds</p>
                </div>
                <textarea autoFocus name='paragraph' disabled={txtara} value={data} onChange={(e)=>changeData(e)} className='form-control' style={{resize: "none",height:"14vh",width: "80vw"}}></textarea>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <button style={{marginRight: "1rem"}} disabled={startBtn} onClick={onClickStart} className='btn btn-success btn-sm'>Start</button>
                <button style={{marginLeft: "1rem"}} disabled={submitBtn} onClick={onClickSubmit} className='btn btn-primary btn-sm'>Submit</button>
            </div>

            <div className="card" style={{width: "80vw"}}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h2>Results</h2></li>
                    {submitBtn&&defaultResult===result && <li className="list-group-item"><img style={{width: "3rem"}} src={spinner} alt="" /></li>}
                    <li className="list-group-item"><p>{result}</p></li>
                </ul>
            </div>
        </div>
    );
}
 
export default ImageGame;
