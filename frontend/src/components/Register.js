import React, { useState } from 'react';
import axios from 'axios';
import './styles/register.css'; // or './Register.css' if you split it
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost/Inventory_Management_System/backend/routes/admin/register.php', {
        username, password, role
      });
      alert(res.data.status === 'success' ? 'Registered!' : 'Error');
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  );
}

export default Register;
