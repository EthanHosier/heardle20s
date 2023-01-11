import React, { useState,useEffect } from 'react'
import useGlobal from '../hooks/useGlobal';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleStop, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Player = ({guessNum}) => {
  const [timeoutID, setTimeoutID] = useState()
  const [timeStarted, setTimeStarted] = useState(new Date())

  const {correctSong, isPlaying,setIsPlaying,playerRef, setHasPlayedToday, hasPlayedToday, duration,ytReady} = useGlobal();

  //handles song having been played for allocated time
  
  const stopSong = () => {
    playerRef.current.internalPlayer.pauseVideo();
    playerRef.current.internalPlayer.seekTo(correctSong.offset);
  }

  const playSong = () =>{
    playerRef.current.internalPlayer.playVideo();
    
  }

 //guess of "X" corresponds to failure to guess correctly
  const updateStats = (g)=>{
    const stats = JSON.parse(localStorage.getItem("scores"))
    stats[g] +=1
    localStorage.setItem("scores",JSON.stringify(stats));
  }


  const getGuessTime = (gn) =>{ //returns guess-time for corresponding guess num in ms
    return (1 + gn*(gn+1)/2)*1000 
  }
  
  const onPlayClicked = () =>{
    if(!isPlaying){ // play
      playSong();
      return
    }
    //stop song
    stopSong();
    
  }
  
  useEffect(()=>{
    if(!ytReady) return;
    playerRef.current.internalPlayer.setVolume(100);
    playerRef.current.internalPlayer.seekTo(correctSong.offset);

    if(hasPlayedToday) playerRef.current.internalPlayer.playVideo(); 

    return () => {
      playerRef.current.internalPlayer.seekTo(correctSong.offset)
    }
  },[ytReady])
  
  useEffect(() =>{
    if (!isPlaying) {
      clearTimeout(timeoutID);
      return;
    }
    let playFor = guessNum !== undefined? getGuessTime(guessNum):duration*1000
    setTimeoutID(setTimeout(stopSong,playFor)) //guess time secs -> ms
    setTimeStarted(new Date())
  }, [isPlaying])

  //handles when the user skips while the song is playing (so keeps playing until new time slot)
  useEffect(()=>{
    if(guessNum == 0 || guessNum == undefined) return //when guessNum is first set
    
    if(guessNum > 5) 
    {
      clearInterval(timeoutID)
      playerRef.current.internalPlayer.pauseVideo();
      setHasPlayedToday(true)
      updateStats("X")
      return
    }

    if(!isPlaying) return;
    clearTimeout(timeoutID);

    let timeRemaining = getGuessTime(guessNum) - ((new Date()) - timeStarted);
    setTimeoutID(setTimeout(stopSong,timeRemaining))
  }, [guessNum])


  return (
    <>
      <ProgressBar isPlaying={isPlaying} guessNum={guessNum} duration={guessNum === undefined? duration: 16 }/>
     
     {ytReady ?
      <button className="play-btn">
        <FontAwesomeIcon icon = {isPlaying? faCircleStop : faCirclePlay} id="play-icon" onClick={onPlayClicked}/>
      </button>
      
    :
    <div className="loader"/>
    }
    </>
    )
}

export default Player