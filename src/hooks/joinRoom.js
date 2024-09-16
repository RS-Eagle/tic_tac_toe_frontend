import { useState } from "react";
import toast from "react-hot-toast";

export const joinRoomHook = () => {
  const [loading1, setLoading] = useState(false);


  const joinRoomId = async (username,gameId) => {
    setLoading(true);
    
    if (!username) {
      return alert("Enter A Valid Username");
    }
    const data = await fetch("api/v1/joinRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId,username }),
    });
    if (!data.ok) {
      setLoading(false);
      const res= await data.json()
      toast.error(res.message)
     return
    }
    const response = await data.json()
    toast.success("Joinning Room")
    setLoading(false);
    return response
  };

  return [loading1, joinRoomId];
};
