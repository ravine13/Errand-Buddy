import React, { useState } from 'react';

function NewHistory({ errand }) {
    const [status, setStatus] = useState('');

    const postHistory = () => {
        // Get errandboy's id from local storage
        const errandboyId = localStorage.getItem('jwt'); 

        // Include errandboy's id in the errand object
        const errandWithId = { ...errand, errandboyId };

        fetch('/new_history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(errandWithId),
        })
        .then(response => response.json())
        .then(data => {
            setStatus('History posted successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            setStatus('Error posting history');
        });
    }

    return (
        <div>
            <button onClick={postHistory}>Complete Errand</button>
            <p>{status}</p>
        </div>
    );
}

export default NewHistory;
