import React, { useState, useEffect } from 'react';

function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Get errandboy's id from local storage
        const errandboyId = localStorage.getItem('jwt');

        fetch(`http://127.0.0.1:5555/messages/${errandboyId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
}

export default Messages;
