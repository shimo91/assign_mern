import React from 'react'
import Navbar from '../elements/Navbar'
import '../css/Main.css'

const Main = (props) => {
  return (
    <div className='mainStyle'>
    <Navbar/>
    {props.child}
  </div>
  )
}

export default Main
