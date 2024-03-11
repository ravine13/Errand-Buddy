import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    profile_picture: '',
    phone_number: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5555/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" required />
      <input name="location" onChange={handleChange} placeholder="Location" />
      <input name="profile_picture" onChange={handleChange} placeholder="Profile Picture" />
      <input name="phone_number" onChange={handleChange} placeholder="Phone Number" required />
      <input name="role" onChange={handleChange} placeholder="Role" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
