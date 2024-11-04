import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>send message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
