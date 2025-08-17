import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import SupplierDashboard from './components/SupplierDashboard';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supplierdashboard" element={<SupplierDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/auth" element={<AuthProvider />} />
      </Routes>
    </Router>
  );
}

export default App;
