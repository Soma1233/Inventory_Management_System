import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="container">
      <h1>Inventory Management System</h1>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <p>Welcome to your inventory dashboard. Track, manage, and organize your items efficiently.</p>
    </div>
  );
}

export default Home;
