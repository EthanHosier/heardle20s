import React, {useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'


const SHARE_LINK = "www.heardle20s.com";
const ShareButton = () => {

    const copyToClipboard = (text) =>{
      
      const unsecuredCopyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("id","copyTA")
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
      }

      if (window.isSecureContext && navigator.clipboard) {
        console.log("secure")
        navigator.clipboard.writeText(text);
      } else {
        unsecuredCopyToClipboard(text);
        console.log("unsecure")
      }

    }
    return (
    <>
      <button id="cp-link" onClick={() => copyToClipboard(SHARE_LINK)}> <FontAwesomeIcon icon={faShareNodes}/>Copy Link</button>
    </>
  )
}

export default ShareButton