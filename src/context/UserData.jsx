import { createContext, useState, useEffect, useContext } from "react";

const UserDataContext = createContext();

export const useUserDataContext = () => {
	return useContext(UserDataContext);
};

export const UserDataContextProvider = ({ children }) => {
    const [userGame,setGameData] = useState({})
	return <UserDataContext.Provider value={{userGame,setGameData }}>{children}</UserDataContext.Provider>;
};