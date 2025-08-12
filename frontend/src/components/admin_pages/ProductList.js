import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '' })

  const API_BASE = 'http://localhost/admin-dashboard/backend/api/products'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE)
      setProducts(res.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API_BASE, form)
      setForm({ name: '', price: '' })
      fetchProducts()
    } catch (err) {
      console.error('Error adding product:', err)
    }
  }

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
