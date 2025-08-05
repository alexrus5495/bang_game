import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { SocketEvents } from "../lib/socketEvents";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setSocketId(socket.id as string);
    }

    function onDisconnect() {
      setIsConnected(false);
      setSocketId("");
    }

    socket.connect();
    socket.on(SocketEvents.connect, onConnect);
    socket.on(SocketEvents.disconnect, onDisconnect);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off(SocketEvents.connect, onConnect);
      socket.off(SocketEvents.disconnect, onDisconnect);
    };
  }, []);

  return { socket, isConnected, socketId };
}
