/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
