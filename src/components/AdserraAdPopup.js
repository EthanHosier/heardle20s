import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef} from 'react'

export const AdserraAdPopup = ({setShowAdPopup}) => {

 



  return (
    <div id="amazon-ad-popup">
         
        <FontAwesomeIcon icon={faX} id="close" className='text-accent' onClick={() =>setShowAdPopup(false)}/>
        
        <div className='ad-container'>
          <AdserraAd/>
        </div>
        
    </div>
  )
}

const AdserraAd = () =>{
  const banner1 = useRef()

  const atOptions = {
		'key' : '6ee8aa84fa200e34752a5c56a5f8e921',
		'format' : 'iframe',
		'height' : 600,
		'width' : 160,
		'params' : {}
	};

  useEffect(() => {
    if (!banner1.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "http" + (window.location.protocol === 'https:' ? 's' : '') + "://www.effectivecreativeformat.com/6ee8aa84fa200e34752a5c56a5f8e921/invoke.js"
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        if (banner1.current) {
            banner1.current.append(conf)
            banner1.current.append(script)
        }
    }
  
  }, [])

  return <div ref={banner1}/>

}



export default AdserraAdPopup;