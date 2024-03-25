import React, { useState, useEffect } from 'react';

// Component for displaying all errands
const History = () => {
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/history', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setHistories(data);
        })
        .catch(error => {
            console.error(`Error fetching data: ${error}`);
        });
    }, []);

    return (
        <div>
            <h1>History</h1>
            {histories.map(history => (
                <div key={history.id}>
                    <h2>Task ID: {history.task_id}</h2>
                    
                </div>
            ))}
        </div>
    );
}

export default History;
