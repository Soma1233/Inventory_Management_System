import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ProductForm from './ProductForm'; // Import the form component
import AddProductForm from './AddProductForm';

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
        await axios.put(`${API_BASE}?id=${form.id}`, form);
      } else {
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

  const handleCancel = () => {
    setForm({ id: null, name: '', description: '', price: '', stock_quantity: '' });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Product Management</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <AddProductForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '250px',
                height: '300px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <div>
                <h4>{product.name}</h4>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stock_quantity}</p>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
