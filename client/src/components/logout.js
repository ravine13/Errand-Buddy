import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/logout', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      const data = await response.json();
      if (data.detail === 'logged out successful') {
        localStorage.removeItem('jwt');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  }

  return (
    <div onClick={handleLogout}>
    </div>

  )
}

export default Logout