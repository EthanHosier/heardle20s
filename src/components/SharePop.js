import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faX } from '@fortawesome/free-solid-svg-icons'
import ShareButton from './ShareButton'

const SharePop = ({close}) => {
  
  return (
    <div className='popup' id="share">
        <FontAwesomeIcon id="close" icon={faX} onClick={close}/>        
        <h1>Share</h1>
        <ShareButton/>
    </div>
  )
}

export default SharePop