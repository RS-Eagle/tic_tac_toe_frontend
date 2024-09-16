import React, { useEffect, useState } from "react";
import { useUserDataContext } from "../context/UserData";
import { useInputHook } from "../hooks/inputHook";

const MainGame = () => {
  const {userGame} = useUserDataContext() 
  const [data,setData] = useState(null)
  const [turn,setTurn] = useState(false)
  const [yourWeapon,setYourWeapon] = useState(null)
  const [obj,setObj] = useState([false,false,false,false,false,false,false,false,false])
  const [isGameEnd,setGameEnd] = useState(false)
  const [userName,setUserName] = useState(null)



  useEffect(()=>{
    setUserName(userGame.userName)
    if(userGame.roomOwner == userGame.userid){
      if(userGame.firstWeapon == userGame.turn){
        setYourWeapon(userGame.turn)
        setTurn(true)
      }else{
        setYourWeapon(userGame.firstWeapon)
        setTurn(false)
      }
    }else{
      if(userGame.secondWeapon == userGame.turn){
        setYourWeapon(userGame.turn)
        setTurn(true)
      }else{
        setYourWeapon(userGame.secondWeapon)
        setTurn(false)
      }
    }
    if(userGame.winner == true){
      setGameEnd(true)
      let newArr = obj
      for (let i of userGame.winningCombo){
        newArr[i] = true
      }
      setObj(newArr)
    }
  },[userGame,data])

  const inputData = useInputHook()


  const inputCall = async(e) => {
    if(isGameEnd)return
    const newData  = await inputData({gameId:userGame.gameId,pos:e,inputid:userGame.userid})
    setData(newData)

  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="info">

        </div>
        <h1 className="text-center text-4xl font-bold mb-6 text-white">
          Tic-Tac-Toe
        </h1>
        <p className="text-2xl text-center text-white mt-1">{userName}</p>
        <p className="text-center text-white mt-1">You Are: {yourWeapon}</p>
        <p className="text-center text-white my-1">{turn?"Your Turn":"Opponent Turn"}</p>

        <div className="board grid grid-cols-3 gap-2 w-80 h-80 mx-auto">
          {userGame.box.map((e,i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  inputCall(i);
                }}
                className={`cell border-2 border-gray-300 w-24 h-24 aspect-square flex items-center justify-center text-2xl font-bold text-gray-700 transition ${obj[i] ? "bg-green-500 scale-105" : "bg-white hover:bg-gray-100"} flex-shrink-0`}
              >{e}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainGame;
