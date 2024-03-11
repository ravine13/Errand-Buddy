import React from 'react'

function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/logout', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.detail === 'logged out successful') {
        // If the logout was successful, remove the JWT token from local storage
        localStorage.removeItem('token');
        // Redirect the user to the login page or home page
        // This depends on your application's routing logic
      }
    } catch (error) {
      console.error('Error during logout', error);
      // Handle any errors here
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
