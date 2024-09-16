
import { Toaster } from 'react-hot-toast'
import './App.css'
import Game from './Game/Game'
import MainGame from './Game/MainGame'


function App() {
  return (
  <div className='h-[100vh]'>
  <Game/>
  
  <Toaster />
  </div>
  )
}

export default App
