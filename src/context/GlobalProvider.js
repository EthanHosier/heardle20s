import { createContext,useEffect,useRef,useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({children}) =>{
    
    const [hasPlayedToday, setHasPlayedToday] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0)
    const [correctSong, setCorrectSong] = useState("") 

    const playerRef = useRef(); 

    return(
        
        <GlobalContext.Provider value={{correctSong, setCorrectSong,hasPlayedToday,setHasPlayedToday,isCorrect,setIsCorrect,isPlaying,setIsPlaying, playerRef, duration, setDuration}}>
            {children}
        </GlobalContext.Provider>
        
    )
}

export default GlobalContext;