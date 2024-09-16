import { useState } from "react";
import toast from "react-hot-toast";

export const createRoom = () => {
  const [loading, setLoading] = useState(false);


  const createRoomId = async (username) => {
    setLoading(true);
    if (!username) {
      return alert("Enter A Valid Username");
    }
    const data = await fetch("https://tic-tac-toe-bcakend.onrender.com/api/v1/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (!data.ok) {
      setLoading(false);
      const res= await data.json()
      toast.error(res.message)
      return
    }
    const response = await data.json()
    toast.success("Room Created")
    setLoading(false);
    return response
  };

  return [loading, createRoomId];
};
