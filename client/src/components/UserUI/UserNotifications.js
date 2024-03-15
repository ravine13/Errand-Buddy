import React, { useState, useEffect } from "react";
import axios from "axios";

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from the flask backend
        axios.get('/notifications')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    return (
        <div>
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