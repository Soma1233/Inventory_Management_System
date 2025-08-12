import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
// import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard';
import SupplierDashboard from './components/SupplierDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supplierdashboard" element={<SupplierDashboard/>} />
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
