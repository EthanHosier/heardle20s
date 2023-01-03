import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const AmazonAdPopup = ({setShowAdPopup}) => {
  return (
    <div id="amazon-ad-popup">
        <FontAwesomeIcon icon={faX} id="close" className='text-accent' onClick={() =>setShowAdPopup(false)}/>
        
        <div className='ad-container' >
            {[...new Array(2)].map((e,i)=>{
                return(
            <iframe 
            key={i}
            src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=14&l=ur1&category=amazongeneric&banner=1Y1ZS14NB4QDQ5ZPV902&f=ifr&linkID=02f8f8e5d5e808cfb3314424f9797824&t=heardle20s-21&tracking_id=heardle20s-21" 
            width="160" 
            height="600" 
            scrolling="no" 
            border="0" 
            marginwidth="0" 
            style={{border:"none"}} 
            frameborder="0" 
            sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"/>
                )
            })}    
        </div>
    </div>
  )
}

export default AmazonAdPopup;