import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import AssignedProductList from './supplier_pages/AssignedProductList'
import StockUpdate from './supplier_pages/StockUpdate'
import NotificationPanel from './supplier_pages/NotificationPanel'

const SupplierDashboard = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('assigned')

  const renderSection = () => {
    switch (activeTab) {
      case 'assigned':
        return <AssignedProductList supplierId={user.id} />
      case 'stock':
        return <StockUpdate supplierId={user.id} />
      case 'notifications':
        return <NotificationPanel />
      default:
        return <AssignedProductList supplierId={user.id} />
    }
  }

  return (
    <div>
      <header style={styles.header}>
        <h2>Welcome, {user.username}</h2>
        <nav style={styles.nav}>
          <button onClick={() => setActiveTab('assigned')}>Assigned Products</button>
          <button onClick={() => setActiveTab('stock')}>Update Stock</button>
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
