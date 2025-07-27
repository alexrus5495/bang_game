import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

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
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return { isConnected, socketId };
}
