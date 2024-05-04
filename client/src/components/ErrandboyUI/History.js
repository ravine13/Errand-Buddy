import React, { useState, useEffect } from 'react';
import './History.css'; 

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
        <div style={{marginLeft:"350px"}}>
            <h1>History</h1>
            {histories.map(history => (
                <div key={history.id}>
                    <h2>Task ID: {history.task_id}</h2>
                    <p>Task Details: {history.details}</p> {/* Add this line */}
                    <p>Status: {history.status}</p> {/* Add this line */}
                </div>
            ))}
        </div>
    );
}

export default History;
