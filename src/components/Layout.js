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
        <LinkedIn/>

        {/*<p id="sorry-for-ads">Sorry about the ads. I need to pay server costs :)</p>*/}
    </main>
  )
}

export default Layout