import React, { useState } from "react";
import { createRoom } from "../hooks/createRoom";

const Validations = () => {
  const [joinRoom, setJoinRoom] = useState(false);
  const [create, setCreateRoom] = useState(false);
  const [data, setData] = useState(false);
  const [username,setUsername] = useState("")
 
  const [loading,createRoomId] = createRoom()

  const handleClickCreateRoom = async()=>{
    if(loading)return
    const response = await createRoomId(username)
    console.log(response)
  }



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
            <label htmlFor="userName " className="text-white text-center mb-2">UserName </label>
            <input className="outline-none rounded-md p-4" value={username} onChange={(e)=>setUsername(e.target.value)}  type="text" id="userName" placeholder="Enter A Username" />
          </div>
          <button className={`bg-white p-4 rounded-lg m-4 ${loading ? "bg-gray-600":""}`} onClick={handleClickCreateRoom}  >{loading?"Creatin..": "Create Room"} </button>
          <p onClick={() => {
              setCreateRoom(false);
              setJoinRoom(false);
            }} className="text-white hover:cursor-pointer hover:text-gray-600 transition-all duration-300">Or Join Room ?</p>
        </div>: ""}
        {joinRoom ? <div className="joinRoom flex items-center flex-col">
        <div className="input flex flex-col">
            <label htmlFor="room" className="text-white text-center mb-2">Room ID </label>
            <input className="outline-none rounded-md p-4" type="text" id="room" placeholder="Enter Room Id" />
          </div>
          <button className="bg-white p-4 rounded-lg m-4"> Join Room </button>
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
