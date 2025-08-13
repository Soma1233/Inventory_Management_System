import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const API_BASE = 'http://localhost/Inventory_Management_System/backend/routes/suppliers';

  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_BASE}/assigned_products.php?userId=${userId}&type=history`)
        .then((res) => {
          const filtered = res.data.filter(
            (p) => p.status === 'approved' || p.status === 'rejected'
          );
          setHistory(filtered);
        })
        .catch((err) => console.error('Error fetching history:', err));
    }
  }, [userId]);

  return (
    <div>
      <h3>Product Request History</h3>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Requested Quantity</th>
              <th>Status</th>
              <th>Assigned At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.requested_quantity}</td>
                <td>{item.status}</td>
                <td>{new Date(item.assigned_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
