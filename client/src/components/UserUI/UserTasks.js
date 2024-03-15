import React, { useState, useEffect } from "react";
import "./UserTasks.css";
import axios from "axios";

const UserTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the Flask backend
        axios.get('/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <div>
            <h1>User Tasks</h1>
            {tasks.map(task => (
                <div key={task.id}>
                    <h2>{task.description}</h2>
                    <p>Status: {task.status}</p>
                    <p>Location: {task.location}</p>
                    <p>Estimated Time: {task.estimated_time} </p>
                </div>
            ))}
        </div>
    );
};

export default UserTasks;