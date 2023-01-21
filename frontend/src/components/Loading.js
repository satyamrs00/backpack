import React, { useContext } from 'react'
// import loading from './images/loading.gif'
import { Player } from "@lottiefiles/react-lottie-player";
import loading from './loading/loading.json'
import ThemeContext from '../context/ThemeContext';
export default function Loading() {
  const {myStyle}=useContext(ThemeContext)
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:`calc(${window.screen.height}px - 9rem - 5.6vw)`,...myStyle,margin:"-1rem 0 0 0"}}>
      <Player autoplay loop src={loading} style={{width:"15rem",height:'15rem'}}></Player>
    </div>
  )
}
