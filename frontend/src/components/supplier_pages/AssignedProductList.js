import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AssignedProductList = ({ supplierId }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`/api/products?supplierId=${supplierId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err))
  }, [supplierId])

  return (
    <div>
      <h3>Assigned Products</h3>
      {products.length === 0 ? (
        <p>No products assigned.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> — Stock: {product.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AssignedProductList
