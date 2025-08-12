import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StockUpdate = ({ supplierId }) => {
  const [products, setProducts] = useState([])
  const [stockUpdates, setStockUpdates] = useState({})

  useEffect(() => {
    axios.get(`/api/products?supplierId=${supplierId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error loading products:', err))
  }, [supplierId])

  const handleChange = (productId, value) => {
    setStockUpdates(prev => ({ ...prev, [productId]: value }))
  }

  const handleSubmit = (productId) => {
    const newStock = stockUpdates[productId]
    axios.put(`/api/products/${productId}/stock`, { stock: newStock })
      .then(() => alert('Stock updated successfully'))
      .catch(err => console.error('Update failed:', err))
  }

  return (
    <div>
      <h3>Update Stock</h3>
      {products.length === 0 ? (
        <p>No products available for update.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name}</span>
              <input
                type="number"
                placeholder="New stock"
                value={stockUpdates[product.id] || ''}
                onChange={(e) => handleChange(product.id, e.target.value)}
              />
              <button onClick={() => handleSubmit(product.id)}>Update</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StockUpdate
