import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faX } from '@fortawesome/free-solid-svg-icons'


const StatsPop = ({close}) => {
  const [xVals, setXVals] = useState([])
  const [yVals,setYVals] = useState([])

  useEffect(()=>{
    const stats = JSON.parse(localStorage.getItem("scores"));
    setXVals(Object.keys(stats));
    setYVals(Object.values(stats));
  },[])
  
  const getMaxValue = (arr) => {
    let max = 0;
    arr.forEach((e)=>{
      max=Math.max(max,e)
    })
    return max;
  }

  const getTotalPlays = (arr) =>{
    let total = 0
    arr.forEach((e) => {
      total += e;
    })
    return total;
  }

  return (
    <div className='popup'>
        <FontAwesomeIcon id="close" icon={faX} onClick={close}/> 
        <h1>Stats</h1>
        <div id="barchart">
          <div id= "barchart-bars-container">
            {yVals.map((y,i)=> <div className='barchart-bar' style={{height: `${100*y/getMaxValue(yVals)}%`, backgroundColor: `${i ==6 && "red"}`}} key={i}>{y? y:""}</div>)}
          </div>
          <div id="barchart-labels-container">
            {xVals.map((x,i)=> <p className='barchart-label' key={i} style={{color: `${i ==6 && "red"}`}}>{x=="X"?"X":`${x}°`}</p>)}
          </div>
          <div id= "specific-stats">
            <div id="nums-stats">
              <p>{getTotalPlays(yVals)}</p>
              <p>{getTotalPlays(yVals.slice(0, yVals.length-1))}</p>
              <p>{getTotalPlays(yVals) && Math.round(100*getTotalPlays(yVals.slice(0, yVals.length-1)) /getTotalPlays(yVals))}%</p>
            </div>
            <div id="nums-stats-labels">
              <p>Played</p>
              <p>Won</p>
              <p>Win Rate</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StatsPop