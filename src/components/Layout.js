import React from 'react'
import { Outlet } from 'react-router-dom'
import GuessSong from './GuessSong'
import Header from './Header'
import useGlobal from '../hooks/useGlobal'
import SongPage from "./SongPage"
import {LinkedIn } from './LinkedIn'

const Layout = () => {
  const {hasPlayedToday} = useGlobal();

  return (
    <main className='App'>
        <Header />
        {hasPlayedToday 
        ? <SongPage/>
        : <GuessSong /> }
        <Outlet />
        <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=13&l=ur1&category=amazongeneric&banner=1TN4F7GKPMYXSAGRWVR2&f=ifr&linkID=0ea98d68e0d06f7b1d8bfb9d46afec26&t=heardle20s-21&tracking_id=heardle20s-21" 
        width="468" 
        height="60" 
        scrolling="no" 
        border="0" 
        marginwidth="0" 
        style={{border:"none"}} 
        frameBorder="0" 
        sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
        <LinkedIn/>

    </main>
  )
}

export default Layout