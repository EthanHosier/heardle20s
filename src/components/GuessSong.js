import { faMagnifyingGlass, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import Player from "./Player"
import raw from '../rsc/songs.txt';
import useGlobal from '../hooks/useGlobal';


const NUM_OF_BARS = 6
const CUSTOM_WHITE = "rgb(227, 227, 227)"
const GuessSong = () => {

  const {correctSong, setIsCorrect, setHasPlayedToday, isPlaying,setIsPlaying} = useGlobal();

  const [songs, setSongs] = useState([])
  const [guesses, setGuesses] = useState(new Array(NUM_OF_BARS));
  const [guessNum, setGuessNum] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [songMatches, setSongMatches] = useState([])
  const [searchBarFocused, setSearchBarFocused] = useState(false)

  const searchRef = useRef();

  useEffect(() =>{

    fetch(raw)
        .then(r => r.text())
        .then(text => {
          let s = JSON.parse(text);
          setSongs(s);
          //setSongMatches(s)
        });
    
  
    const storedGuesses = JSON.parse(localStorage.getItem("guesses"));
    if(!storedGuesses){
      setGuesses(["","","","","",""])
      return
    }

    setGuessNum(getPrevGuessNum(storedGuesses))
    setGuesses(storedGuesses)
  }, [])

  const getPrevGuessNum = (sgs) =>{
    for (let i = 0; i<sgs.length; i++){
      if (sgs[i] == "") return i;
    }
  }

  //runs every time current guess changes (TODO: Searches for matches)
  useEffect(() =>{
    if(currentGuess == ""){
      return;
    }
    //TODO: make this more efficient with tree / linked list type structure of popping songs on and off it instead of searching through all songs every time
    setSongMatches(songs.filter(obj =>{
      let s = obj.song.toLowerCase();
      let a = obj.artist.toLowerCase(); 
      let g = currentGuess.toLowerCase();
      return `${s} - ${a}`.includes(g);
  }));
  },[currentGuess])


  useEffect(() =>{
    localStorage.setItem("guesses",JSON.stringify(guesses))
  },[guesses])

  const updateGuessesArray = (x) =>{
    setGuesses(guesses.map((e,i) => {
      return i == guessNum? x : e;
    }))
  }
 
  const onSkip = () =>{
    updateGuessesArray("SKIPPED")
    setGuessNum(guessNum + 1)
  }

  //this may not correctly work asynchronously
  const onSubmit = () =>{
    let answer = correctSong.name + " - " + correctSong.artist;
    if(currentGuess === answer){
      setIsCorrect(true)
      setHasPlayedToday(true)
      localStorage.setItem("won-last",true)
      updateStats(guessNum+1)
      setIsPlaying(true)
      return;
    }
    updateGuessesArray(currentGuess);
    setGuessNum(guessNum + 1)
    setCurrentGuess("")
  }

  //guess of "X" corresponds to failure to guess
  const updateStats = (g)=>{
    const stats = JSON.parse(localStorage.getItem("scores"))
    stats[g] +=1
    localStorage.setItem("scores",JSON.stringify(stats));
  }

  return (
    <div id="guess-song-container">
      <div className='bars'>
        {guesses.map((g,i) =>{
          return  <div className={`guess-box ${(guessNum == i) ? "active":""}`} key={i}>
            <FontAwesomeIcon id= "square-x-icon" icon = {faSquareXmark} className = {guessNum <= i ? "invisible" : (guesses[i] != "SKIPPED"? "incorrect":"")} /> 
            {/*className={currentGuess > i ? "":"invisible"}*/ }
            <p>{g}</p>
            </div>
        })}
      </div>
      
      <Player songID={correctSong.id} startOffset={correctSong.offset} guessNum={guessNum}/>

      
      
      {searchBarFocused && <div id="search-overlay" onClick={() => setSearchBarFocused(false)} />}

      <div id="guess-container" style={searchBarFocused? {  border: `solid ${CUSTOM_WHITE} 1px`} : {}}>
        {currentGuess != "" && songMatches.length > 0 && searchBarFocused &&
          <div id="song-matches">
            {songMatches.slice(0,10).map((e,i) =>
            <div 
            id = {`match${i}`} 
            key={i} 
            className='song-match'
            onClick = {() => {
              setCurrentGuess(`${e.song} - ${e.artist}`)
              setSearchBarFocused(false)
            }}
            >
            {`${e.song} - ${e.artist}`}
            </div>
            )}
          </div>
        }
        <div id="search-songs" >
          <label htmlFor="searchbar">
            <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} />
          </label>
          <input
          type="text"
          id="searchbar"
          ref={searchRef}
          autoComplete="off"
          onChange={(e) => setCurrentGuess(e.target.value)}
          value={currentGuess}
          onFocus={() => setSearchBarFocused(true)}
          />
        </div>
      </div>


      <div id="submit-btns-container">
        <button id="skip" onClick={onSkip}>Skip {guessNum <5 && `(+${guessNum+1}s)`}</button>
        <button id="submit" onClick = {onSubmit} disabled={searchRef?.current?.value ==""}>Submit</button>
      </div>

    </div>
  )
}

export default GuessSong