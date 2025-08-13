import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import AssignedProductList from './supplier_pages/AssignedProductList'
// import StockUpdate from './supplier_pages/StockUpdate'
import NotificationPanel from './supplier_pages/NotificationPanel'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import History from './supplier_pages/History';

const SupplierDashboard = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('assigned')
  
  const navigate = useNavigate();

  const renderSection = () => {
    switch (activeTab) {
      case 'assigned':
        return <AssignedProductList userId={user.id} />
      case 'history':
        return <History userId={user.id} />
      case 'notifications':
        return <NotificationPanel />
      default:
        return <AssignedProductList supplierId={user.id} />
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
        <h2>Welcome,</h2>{user ? (
      <h3>{user.username}!</h3>
    ) : (
      <p>Loading user info...</p>
    )}
        <nav style={styles.nav}>
          <button onClick={() => setActiveTab('assigned')}>Assigned Products</button>
          <button onClick={() => setActiveTab('history')}>History</button>
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
    backgroundColor: '#e0f7fa',
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

export default SupplierDashboard
