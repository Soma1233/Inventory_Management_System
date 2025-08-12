import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ name: '', contact: '' })

  const API_BASE = 'http://localhost/admin-dashboard/backend/api/suppliers'

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(API_BASE)
      setSuppliers(res.data)
    } catch (err) {
      console.error('Error fetching suppliers:', err)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API_BASE, form)
      setForm({ name: '', contact: '' })
      fetchSuppliers()
    } catch (err) {
      console.error('Error adding supplier:', err)
    }
  }

  return (
    <div>
      <h2>Suppliers</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Supplier</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No suppliers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SupplierList
