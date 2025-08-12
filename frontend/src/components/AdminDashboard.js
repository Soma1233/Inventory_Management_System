import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import ProductList from './admin_pages/ProductList'
import SupplierList from './admin_pages/SupplierList'
import AssignmentPanel from './admin_pages/AssignmentPanel'
import NotificationPanel from './admin_pages/NotificationPanel'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('products')

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

  return (
    <div>
      <header style={styles.header}>
        <h2>Welcome, --{user ? (
      <h2>Welcome, {user.username}!</h2>
    ) : (
      <p>Loading user info...</p>
    )}</h2>
        <nav style={styles.nav}>
          <button onClick={() => setActiveTab('products')}>Products</button>
          <button onClick={() => setActiveTab('suppliers')}>Suppliers</button>
          <button onClick={() => setActiveTab('assignments')}>Assignments</button>
          <button onClick={() => setActiveTab('notifications')}>Notifications</button>
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
