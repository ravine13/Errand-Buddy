import React, { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div style={{marginLeft:"350px"}}>
      {tasks.map((task, index) => (
        <div key={index} onClick={() => handleTaskClick(task)}>
          <h2>{task.description}</h2>
        </div>
      ))}
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
}

function TaskDetails({ task }) {
  return (
    <div>
      <h2>{task.description}</h2>
      <p>Status: {task.status}</p>
      <p>Location: {task.location}</p>
      <p>Estimated Time: {task.estimated_time}</p>
    </div>
  );
}

export default TaskList;
