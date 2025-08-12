// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [editing, setEditing] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const res = await axios.get('http://localhost/Inventory_Management_System/backend/routes/get_users.php');
//     setUsers(res.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.post('http://localhost/backend/delete_user.php', { id });
//     fetchUsers();
//   };

//   const handleEdit = async () => {
//     await axios.post('http://localhost/backend/edit_user.php', editing);
//     setEditing(null);
//     fetchUsers();
//   };

//   return (
//     <div>
//       <h2>User Dashboard</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>ID</th><th>Username</th><th>Role</th><th>Created At</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             editing?.id === user.id ? (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td><input value={editing.username} onChange={e => setEditing({...editing, username: e.target.value})} /></td>
//                 <td>
//                   <select value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})}>
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </td>
//                 <td>{user.created_at}</td>
//                 <td>
//                   <button onClick={handleEdit}>Save</button>
//                   <button onClick={() => setEditing(null)}>Cancel</button>
//                 </td>
//               </tr>
//             ) : (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.username}</td>
//                 <td>{user.role}</td>
//                 <td>{user.created_at}</td>
//                 <td>
//                   <button onClick={() => setEditing(user)}>Edit</button>
//                   <button onClick={() => handleDelete(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             )
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;


import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard