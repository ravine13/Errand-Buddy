import React, { useState, useEffect } from "react";
import axios from "axios";

const UserMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages from the Flask backend
        axios.get('/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    return (
        <div>
            <h1>User Messages</h1>
            {messages.map(message => (
                <div key={message.id}>
                    <h2>Message ID: {message.id}</h2>
                    <p>Message: {message.message}</p>
                    <p>Sender: {message.sender}</p>
                    <p>Timestamp: {new Date(message.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default UserMessages;