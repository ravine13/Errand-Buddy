import React, { useState, useEffect } from "react";
import axios from "axios";

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('jwt');

    useEffect(() => {
        setLoading(true);
        // Fetch notifications from the flask backend
        axios.get(`/notifications/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(response => {
                setNotifications(response.data);
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
