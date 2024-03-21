import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieve } from "../Encryption"; 

const UserMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const retrievedUser = retrieve(); // Get the retrieved user from the retrieve function
    const userId = retrievedUser ? retrievedUser.sub : null; // Extract the user ID from the retrieved user

    useEffect(() => {
        setLoading(true);
        // Fetch messages from the Flask backend
        axios.get(`/messages/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                // Check if the response is an array or a single object
                const fetchedMessages = Array.isArray(response.data)
                    ? response.data
                    : [response.data];
                setMessages(fetchedMessages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                setError('Error fetching messages');
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="content-wrapper" style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
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