import React, { useEffect, useState } from 'react'
import Validations from './Validations'
import MainGame from './MainGame'

import { useUserDataContext } from '../context/UserData';


const Game = () => {
  const {userGame } = useUserDataContext()
  useEffect(()=>{},[userGame])
  // console.log(userGame.box)
  return (
    <div className='h-[100vh] bg-slate-800 '>
       {
        !userGame.box ? <Validations/> : <MainGame/>
       }
    

    </div>
  )
}

export default Game
