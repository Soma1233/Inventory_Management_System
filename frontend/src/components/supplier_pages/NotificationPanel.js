import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    axios.get('/api/notifications?supplier=true')
      .then(res => setNotifications(res.data))
      .catch(err => console.error('Error loading notifications:', err))
  }, [])

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {notifications.map(note => (
            <li key={note.id}>
              <strong>{note.title}</strong>: {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationPanel
