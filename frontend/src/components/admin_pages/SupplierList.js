import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({
    id: null,
    name: '',
    contact_email: '',
    phone: '',
    address: ''
  })

  const API_BASE = 'http://localhost/Inventory_Management_System/backend/routes/admin/suppliers.php'

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(API_BASE)
      setSuppliers(Array.isArray(res.data) ? res.data : [])
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
      if (form.id) {
        await axios.put(`${API_BASE}?id=${form.id}`, form)
      } else {
        await axios.post(API_BASE, form)
      }
      setForm({ id: null, name: '', contact_email: '', phone: '', address: '' })
      fetchSuppliers()
    } catch (err) {
      console.error('Error saving supplier:', err)
    }
  }

  const handleEdit = (supplier) => {
    setForm(supplier)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}?id=${id}`)
      fetchSuppliers()
    } catch (err) {
      console.error('Error deleting supplier:', err)
    }
  }

  return (
    <div>
      <h2>Supplier Management</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="contact_email" placeholder="Email" value={form.contact_email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">{form.id ? 'Update' : 'Add'} Supplier</button>
        {form.id && <button type="button" onClick={() => setForm({ id: null, name: '', contact_email: '', phone: '', address: '' })}>Cancel</button>}
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.contact_email}</td>
                <td>{s.phone}</td>
                <td>{s.address}</td>
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No suppliers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SupplierList
