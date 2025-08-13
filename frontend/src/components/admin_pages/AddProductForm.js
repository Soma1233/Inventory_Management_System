// AddProductForm.js
import React from 'react';

const AddProductForm = ({ form, handleChange, handleSubmit, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '300px',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input type="number" name="stock_quantity" placeholder="Stock Quantity" value={form.stock_quantity} onChange={handleChange} required />
      <button type="submit">{form.id ? 'Update Product' : 'Add Product'}</button>
      {form.id && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddProductForm;
