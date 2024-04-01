import React, { useState } from 'react';

function NewMessage() {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get errandboy's id from local storage
        const errandboyId = localStorage.getItem('jwt'); 

        fetch('http://127.0.0.1:5555/new_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, errandboyId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setMessage(''); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewMessage;
