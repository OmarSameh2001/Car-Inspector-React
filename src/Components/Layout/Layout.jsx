import React from 'react'
import Navigation from '../../Parts/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../../Parts/Footer/Footer'

export default function Layout({children}) {
  return (
    <>
    <Navigation/>
    <Outlet/>
    <Footer/>
    </>
  )
}
