import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    stock_quantity: ''
  });

  const API_BASE = 'http://localhost/Inventory_Management_System/backend/routes/admin/products.php';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Update existing product
        await axios.put(`${API_BASE}?id=${form.id}`, form);
      } else {
        // Add new product
        await axios.post(API_BASE, form);
      }
      setForm({ id: null, name: '', description: '', price: '', stock_quantity: '' });
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}?id=${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="number" name="stock_quantity" placeholder="Stock Quantity" value={form.stock_quantity} onChange={handleChange} required />
        <button type="submit">{form.id ? 'Update Product' : 'Add Product'}</button>
        {form.id && <button type="button" onClick={() => setForm({ id: null, name: '', description: '', price: '', stock_quantity: '' })}>Cancel</button>}
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock_quantity}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
