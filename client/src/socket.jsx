import { createContext, useContext } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const socketContext = createContext(io())

export const SocketProvider =
    ({ children }) => <socketContext.Provider value={socket}>{children}</socketContext.Provider>;
    
const useSocket = () => useContext(socketContext)

export default useSocket;