import React,{useEffect, useRef,useState} from 'react'

const PlayerInfo = (props) => {
    const gradientRef=useRef();
    const [Color1,setColor1]=useState(360);
    const [Color2,setColor2]=useState(0);

    const changeGradient=(x)=>{
        var x="conic-gradient(lightgrey 0deg ,lightgrey "+x+"deg"+", #448aff "+x+"deg , #448aff 360deg)";
        gradientRef.current.style.background=x;
    }
    const calc=()=>{
        if(Color1!==0){
            const degrees=360-((props.percentage*360)/100);
            changeGradient(degrees);
            setColor1(degrees);
            setColor2(360);
        }
    }
    useEffect(()=>{
        calc();
    },[props.percentage]);
    return (
        <>
            {/* <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <h5 style={{fontWeight: "700"}} className="text-left">{props.userName} :&nbsp;</h5>
                <div className="progress my-1" style={{width: "90%"}}key={props._id}>
                    <div className="progress-bar" role="progressbar" style={{width: props.percentage}}>{props.percentage}</div>
                </div>  
            </div>  */}
            <div className='d-flex align-items-center justify-content-center gap-1 px-3 mb-1'>
                <h5 style={{fontWeight: "700"}} className="text-left">{props.userName} :&nbsp;</h5>
                <div ref={gradientRef} style={{padding: "0.5vh",height: "5vh",width:"5vh",borderRadius: "50%",background: "conic-gradient(lightgrey 100%,#448aff 0%)"}}>
                    <div style={{height: "4vh",width:"4vh",borderRadius: "50%"}} className='d-flex flex-column align-items-center justify-content-center bg-white'>
                    <p style={{margin: "4px",fontSize: "13px",fontWeight: "bold"}}>{props.percentage}%</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const ProgressBar = ({player, players, wordsLength}) => {

    const calculatePercentage = (player, wordsLength) => {
        if (player.currWordInd !== 0) {
            return ((player.currWordInd / wordsLength) * 100).toFixed(0)
        }
        return 0;
    }
    const percentage = calculatePercentage(player, wordsLength)

    return (
        <>
            {
                <>
                    <PlayerInfo key={player._id} userName={player.userName} _id={player._id} percentage={percentage}/>
                </>
            }
            {
                players.map(playerObj => {
                    const percentage = calculatePercentage(playerObj, wordsLength)
                    return (playerObj._id !== player._id ? 
                    <>
                        <PlayerInfo key={player._id} userName={playerObj.userName} _id={playerObj._id} percentage={percentage}/>
                    </> : null
                    )
                })
            }
        </>
    )
}

export default ProgressBar