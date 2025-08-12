import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/login.css'; 
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setuser}=useContext(AuthContext)
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost/Inventory_Management_System/backend/routes/admin/login.php', {
        username,
        password
      });
  
      if (res.data.status === 'success') {
        const role = res.data.user.role;
        setuser(res.data.user)

  
        if (role === 'admin') {
          navigate('/admindashboard');
        } else if (role === 'supplier') {
          navigate('/supplierdashboard');
        } else {
          alert('Unknown role. Please contact support.');
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to='/register'  >Register</Link> </p>
    </div>
  );
}

export default Login;
