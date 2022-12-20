import React, { useState, useEffect } from 'react'

const WIDTH_PERCENTAGES = {
  0:6.25,
  1:12.5,
  2:25,
  3:43.75,
  4:68.75,
  5:100,
}

const ProgressBar = ({isPlaying, guessNum,duration}) => {
    //used to update elapsed time
    const [intervalID,setIntervalID] = useState();
    const [timeElapsed,setTimeElapsed] = useState();
    

    useEffect(() =>{
    if(!isPlaying){
      setTimeElapsed(0);
      if(intervalID) clearInterval(intervalID);
      return
    }

    let ms10 = 0;
    setIntervalID(setInterval(()=>setTimeElapsed((++ms10)/10),100))
  },[isPlaying])
  
    const getTimerFormat = (totalSecs)=>{
        let mins = Math.floor(totalSecs/60)
        let secs = Math.floor(totalSecs) % 60;

        if (secs > 9) return `${mins}:${secs}`
        else return `${mins}:0${secs}`
    }

    return (
    <div id = "progress">
      <div id="grey-bar" style={{width:`${guessNum ===undefined? 100:WIDTH_PERCENTAGES[guessNum]}%`}}/>
      <div id="progress-color" style={{width:`${(100*timeElapsed /duration)}%`}}/>
      <div id="progress-bar">
        <div id="contents">
          {guessNum !== undefined && [...Array(6)].map((x, i) =>
             <div id={`p${i}`} key={i} className= "partial-bar"/>
          )}
        </div>
      </div>
      <div id="timers">
         <p>{getTimerFormat(timeElapsed)}</p>
         <p>{getTimerFormat(duration)}</p>
       </div>
    </div>
  )
}

export default ProgressBar