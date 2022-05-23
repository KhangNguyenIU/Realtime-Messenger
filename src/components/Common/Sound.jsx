import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

/**
* @author
* @function GlobalSound
**/

export const GlobalSound = (props) => {
    const sound = useSelector(state=>state.sound)
    const audioRef = useRef(null)

    useEffect(()=>{
        if(sound && audioRef.current){
            // console.log(sound , audioRef.current)
            audioRef.current.setAttribute('src', sound.sound || "")
            audioRef.current.loop = sound.playInLoop
            if(sound.play){
                audioRef.current.play()
            }else{
                audioRef.current.pause()
                audioRef.current.currentTime =0
            }
        }
    },[sound, audioRef])
    
  return(
    <div>
        <audio ref={audioRef} src={sound.sound}></audio>
    </div>
   )
  }
