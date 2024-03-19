import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieve } from "../Encryption";

const UserTasks = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const retrievedUser = retrieve();
  const userId = retrievedUser ? retrievedUser.sub : null;

  useEffect(() => {
    axios
      .get(`/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        console.log("Fetched tasks:", response.data);
        // Check if the response is an array or a single object
        const fetchedTasks = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setTasks(fetchedTasks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      });
  }, [userId]);

  return (
    <div
      className="content-wrapper"
      style={{
        marginLeft: "280px",
        backgroundColor: "white",
        marginTop: "20px",
      }}
    >
      <h1>User Tasks</h1>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.description}</h2>
            <p>Status: {task.status}</p>
            <p>Location: {task.location}</p>
            <p>Estimated Time: {task.estimated_time}</p>
          </div>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default UserTasks;