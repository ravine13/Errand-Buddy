import React, { useEffect, useState } from 'react';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/notifications')
      .then(response => response.json())
      .then(data => {
        setNotifications(data);
        console.log(data);  
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{marginLeft:"350px"}}>
      {notifications.map((notification, index) => (
        <div key={index}>
          <h2>Message: {notification.message}</h2>
          <p>User ID: {notification.user_id}</p>
          <p>Errand Boy ID: {notification.errand_boy_id}</p>
        </div>
      ))}
    </div>
  );
}

export default Notification;

