import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserDataContextProvider } from "./context/UserData.jsx";
import { SocketContextProvider } from "./socket/socket.jsx";

createRoot(document.getElementById("root")).render(

    <UserDataContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </UserDataContextProvider>

);
