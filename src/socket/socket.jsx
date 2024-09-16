import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useUserDataContext } from "../context/UserData";
const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const {userGame,setGameData } = useUserDataContext()
	useEffect(()=>{

	},[userGame])

	const socketConnection = (id) => {
		console.log(userGame)
		if (userGame) {
			const socket = io("http://localhost:3000", {
				query: {
					userid: id,
				},
			});

			setSocket(socket);

			socket.on("gameData", (data) => {
				setGameData({...userGame,...data});
	
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	};

	return <SocketContext.Provider value={{ socket,socketConnection  }}>{children}</SocketContext.Provider>;
};