import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [selectedRole, setSelectedRole] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((result) => {
        localStorage.setItem(
          "jwt",
          result.token
        );
        console.log(result);
     const selectedRole = result.user.role

        switch (selectedRole) {
          case "ErrandBoy":
            navigate(`/errandboy/profile`);
            break;
          case "User":
            navigate("/user/profile");
            break;
          default:
            console.error("Unknown role:", selectedRole);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Invalid Email or Password: Please try again.');
      });
  };

  return (
    <div>
      <h1>Login Form</h1>    
      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;