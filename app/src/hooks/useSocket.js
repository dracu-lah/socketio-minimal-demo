import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocket = (url, event) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = io(url);

    // Listen for a specific event (e.g., 'message')
    socketRef.current.on(event, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [url, event]);

  // Function to emit messages
  const sendMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit(event, message);
    }
  };

  return { messages, sendMessage };
};

export default useSocket;
