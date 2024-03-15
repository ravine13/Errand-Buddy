import React, { useState, useEffect } from "react";
import axios from "axios";

const UserMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // Get user's id from local storage
    const userId = localStorage.getItem('jwt');

    useEffect(() => {
        setLoading(true);
        // Fetch messages from the Flask backend
        axios.get(`/messages/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                setMessages(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                setError('Error fetching messages');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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