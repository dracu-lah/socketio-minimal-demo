import React, { useState } from "react";
import useSocket from "./hooks/useSocket"; // import the custom hook

const WebSocketComponent = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useSocket("ws://localhost:8080", "message"); // Using the custom hook

  const handleSend = () => {
    sendMessage(input); // Send the input to the server
    setInput(""); // Clear the input
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
