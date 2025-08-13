import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import ProductList from './admin_pages/ProductList'
import SupplierList from './admin_pages/SupplierList'
import AssignmentPanel from './admin_pages/AssignmentPanel'
import NotificationPanel from './admin_pages/NotificationPanel'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('products')


  const navigate = useNavigate();


  const renderSection = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />
      case 'suppliers':
        return <SupplierList />
      case 'assignments':
        return <AssignmentPanel />
      case 'notifications':
        return <NotificationPanel />
      default:
        return <ProductList />
    }
  }

  const Logout = async () => {
    try {
      const res = await axios.get('http://localhost/Inventory_Management_System/backend/routes/logout.php', {
        // withCredentials: true
      });
      // console.log(res)
      if (res.data.status === 'logged out') {
        // setuser(null); // Clear user context
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  

  return (
    <div>
      <header style={styles.header}>
        <h2>Welcome,</h2> {user ? (
      <h3>{user.username}!</h3>
    ) : (
      <p>Loading user info...</p>
    )}
        <nav style={styles.nav}>
          <button onClick={() => setActiveTab('products')}>Products</button>
          <button onClick={() => setActiveTab('suppliers')}>Suppliers</button>
          <button onClick={() => setActiveTab('assignments')}>Request Stock</button>
          <button onClick={() => setActiveTab('notifications')}>Notifications</button>
          <button onClick={() => Logout()}>Logout</button>
        </nav>
      </header>

      <main style={styles.main}>
        {renderSection()}
      </main>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ccc'
  },
  nav: {
    display: 'flex',
    gap: '1rem'
  },
  main: {
    padding: '1rem'
  }
}

export default AdminDashboard
