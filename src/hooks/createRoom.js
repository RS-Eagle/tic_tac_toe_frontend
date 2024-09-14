import { useState } from "react";

export const createRoom = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const createRoomId = async (username) => {
    setLoading(true);
    if (!username) {
      return alert("Enter A Valid Username");
    }
    const data = await fetch("api/v1/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const response = await data.json()
    setLoading(false);
    return response
  };

  return [loading, createRoomId];
};
