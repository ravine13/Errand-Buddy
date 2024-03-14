import React, { useState, useEffect } from 'react';

function Availability() {
    const [availabilities, setAvailabilities] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Get errandboy's id from local storage
    const errandboyId = localStorage.getItem('jwt');

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/availability/${errandboyId}`)
            .then(response => response.json())
            .then(data => setAvailabilities(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:5555/new_availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startTime, endTime, errandboyId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setStartTime('');
            setEndTime('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1>Availability</h1>
            {availabilities.map((availability, index) => (
                <div key={index}>
                    <p>Start Time: {availability.start_time}</p>
                    <p>End Time: {availability.end_time}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <label>
                    Start Time:
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                </label>
                <label>
                    End Time:
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Availability;
