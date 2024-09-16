import React, { useEffect, useRef, useState } from "react";
import { createRoom } from "../hooks/createRoom";
import { useUserDataContext } from "../context/UserData";
import { useSocketContext } from "../socket/socket";
import { joinRoomHook } from "../hooks/joinRoom";
import toast from "react-hot-toast";


const Validations = ({prop}) => {
  const [joinRoom, setJoinRoom] = useState(false);
  const [create, setCreateRoom] = useState(false);
  const [username,setUsername] = useState("")
  const [gameId,setgameId] =useState("")

  const {userGame,setGameData } = useUserDataContext()
  const {socketConnection}= useSocketContext()

 
  const [loading,createRoomId] = createRoom()
  const [loading1, joinRoomId] = joinRoomHook()

  const handleClickCreateRoom = async()=>{
    if(loading)return
    if(username.split(" ").join("") == ""){
      toast.error("Enter A Valid Input")
      return
    }
    const response = await createRoomId(username)
    await setGameData({...userGame,...response["gameData"]})

  }

  const handleClickJoinRoom =async ()=>{
    if(loading)return
    if(username.split(" ").join("") == "" || gameId.split(" ").join("") == "" ){
      toast.error("Enter A Valid Input")
      return
    }
    const response = await joinRoomId(username,gameId)

    await setGameData({...userGame,...response})
    console.log(response)
    socketConnection(response.userid); 
 


  }


  const hasRunEffect = useRef(false);
  useEffect(() => {


    if (!hasRunEffect.current && Object.keys(userGame).length > 0) {

      socketConnection(userGame.userid); 
      hasRunEffect.current = true
    }

  }, [userGame])


  return (
    <div className="bg-slate-800 h-full w-full">
      <div className="room_create flex justify-center items-center h-full">
        { !joinRoom && !create ? <div className="button flex flex-col">
          <button
            className="bg-white p-4 rounded-lg m-4"
            onClick={() => {
              setJoinRoom(true);
            }}
          >
            Join Room
          </button>
          <button
            className="bg-white p-4 rounded-lg m-4"
            onClick={() => {
              setCreateRoom(true);
            }}
          >
            Create Room
          </button>
        </div>:""}
        {create ? <div className="createRoom flex items-center flex-col">
          <div className="input flex flex-col">
           {userGame["gameId"]? <h2 className="text-center text-5xl text-white">Room Id : {userGame["gameId"]}</h2>:""}
            <label htmlFor="userName " className="text-white text-center mb-2">UserName </label>
            <input className="outline-none rounded-md p-4" value={username} onChange={(e)=>setUsername(e.target.value)} disabled={userGame["gameId"] ? true : false}  type="text" id="userName" placeholder="Enter A Username" />
          </div>
          <button className={`bg-white p-4 rounded-lg m-4 ${loading ? "bg-gray-600":""}`} onClick={handleClickCreateRoom} disabled={loading || userGame["gameId"] ? true : false}  >{loading?"Creating..": "Create Room"} </button>
          <p onClick={() => {
              setCreateRoom(false);
              setJoinRoom(false);
            }} className="text-white hover:cursor-pointer hover:text-gray-600 transition-all duration-300">Or Join Room ?</p>
        {userGame["gameId"]?<p className="text-white text-3xl">Waiting For Player...</p>:""}
        </div>
        : ""}
        {joinRoom ? <div className="joinRoom flex items-center flex-col">
        <div className="input flex flex-col">
          <label htmlFor="userName" className="text-white text-center mb-2">UserName </label>
          <input className="outline-none rounded-md p-4 mb-2" value={username} onChange={(e)=>setUsername(e.target.   value)} disabled={userGame["gameId"] ? true : false}  type="text" id="userName" placeholder="Enter A Username" />
          <label htmlFor="room" className="text-white text-center mb-2">Room ID </label>
          <input className="outline-none rounded-md p-4" value={gameId} onChange={(e)=>setgameId(e.target.value)}  type="text" id="room" placeholder="Enter RoomId" />
          </div>
          <button className="bg-white p-4 rounded-lg m-4" disabled={loading1  ? true : false} onClick={handleClickJoinRoom}>{loading1?"Connecting..": "Join Room"} </button>
          <p onClick={() => {
              setCreateRoom(false);
              setJoinRoom(false);
            }} className="text-white hover:cursor-pointer hover:text-gray-600 transition-all duration-300">Or Create Room ?</p>
        </div>:""}
      </div>
    </div>
  );
};

export default Validations;
