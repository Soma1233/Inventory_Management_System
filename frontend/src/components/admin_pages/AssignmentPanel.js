import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AssignmentPanel = () => {
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ product_id: '', supplier_id: '', stock: '' })

  const API_BASE = 'http://localhost/admin-dashboard/backend/api'

//   useEffect(() => {
//     fetchProducts()
//     fetchSuppliers()
//   }, [])

  const fetchProducts = async () => {
    const res = await axios.get(`${API_BASE}/products`)
    setProducts(res.data)
  }

  const fetchSuppliers = async () => {
    const res = await axios.get(`${API_BASE}/suppliers`)
    setSuppliers(res.data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE}/assignments`, form)
      alert('Assignment saved!')
      setForm({ product_id: '', supplier_id: '', stock: '' })
    } catch (err) {
      console.error('Error assigning product:', err)
    }
  }

  return (
    <div>
      <h2>Product Assignment</h2>

      <form onSubmit={handleSubmit}>
        <select name="product_id" value={form.product_id} onChange={handleChange} required>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select name="supplier_id" value={form.supplier_id} onChange={handleChange} required>
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">Assign</button>
      </form>
    </div>
  )
}

export default AssignmentPanel
