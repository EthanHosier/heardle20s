import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faCircleInfo, faCircleQuestion, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AboutPop from './AboutPop'
import HowToPlayPop from './HowToPlayPop'
import SharePop from './SharePop'
import StatsPop from './StatsPop'


const Header = () => {

  //states determing popup
  const [HTPActive, setHTPActive] = useState(false)
  const [statsActive, setStatsActive] = useState(false)
  const [aboutActive, setAboutActive] = useState(false)
  const [shareActive, setShareActive] = useState(false)

  return (
    <>
      <div id="header-div">
        <div className='header-btn-container' id="left">
          <button id="about" onClick={() => setAboutActive(true)}>
            <FontAwesomeIcon icon={faCircleInfo} className="icon-btn" />
          </button>
          <button id="share" onClick={() => setShareActive(true)}>
            <FontAwesomeIcon icon={faShareNodes} className="icon-btn" />
          </button>
        </div>
        <p>Heardle 20s</p>
        <div className='header-btn-container' id="left">
          <button id="stats" onClick={() => setStatsActive(true)}>
            <FontAwesomeIcon icon={faChartSimple} className="icon-btn" />
          </button>
          <button id="how-to-play" onClick={() => setHTPActive(true)}>
            <FontAwesomeIcon icon={faCircleQuestion} className="icon-btn" />
          </button>
        </div>
      </div>

      {aboutActive &&
        <>
          <AboutPop close={() => setAboutActive(false)} />
          <div id='overlay' onClick={() => setAboutActive(false)} />
        </>
      }

      {statsActive &&
        <>
          <StatsPop close={() => setStatsActive(false)} />
          <div id='overlay' onClick={() => setStatsActive(false)} />
        </>
      }

      {shareActive &&
        <>
          <SharePop close={() => setShareActive(false)} />
          <div id='overlay' onClick={() => setShareActive(false)} />
        </>
      }

      {HTPActive &&
        <>
          <HowToPlayPop close={() => setHTPActive(false)} />
          <div id='overlay' onClick={() => setHTPActive(false)} />
        </>
      }

    </>

  )
}

export default Header