import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieve } from "../Encryption"; // Import the retrieve function

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const retrievedUser = retrieve(); // Get the retrieved user from the retrieve function
    const userId = retrievedUser ? retrievedUser.sub : null; // Extract the user ID from the retrieved user

    useEffect(() => {
        setLoading(true);
        // Fetch notifications from the flask backend
        axios.get(`/notification/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                // Check if the response is an array or a single object
                const fetchedNotifications = Array.isArray(response.data)
                    ? response.data
                    : [response.data];
                setNotifications(fetchedNotifications);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                setError('Error fetching notifications');
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content-wrapper" style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
            <h1>User Notifications</h1>
            {notifications.map(notification => (
                <div key={notification.id}>
                    <h2>Notification ID: {notification.id}</h2>
                    <p>Message: {notification.message}</p>
                    <p>Timestamp: {new Date(notification.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default UserNotifications;