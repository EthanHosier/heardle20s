import React from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutPop = ({close}) => {
  return (
    <div className='popup' id="about-pop">
        <FontAwesomeIcon id="close" icon={faX} onClick={close}/>
        <h1>About</h1>
        <p>Each daily Heardle 20s features a clip from a popular 2020s song. 
          Guess in as few tries as possible, and come back every day for a new song!</p>
     </div>
  )
}

export default AboutPop