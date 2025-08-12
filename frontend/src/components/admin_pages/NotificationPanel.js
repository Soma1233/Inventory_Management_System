import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([])

  const API_BASE = 'http://localhost/admin-dashboard/backend/api/notifications'

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(API_BASE)
      setNotifications(res.data)
    } catch (err) {
      console.error('Error fetching notifications:', err)
    }
  }

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <li key={note.id}>
              {note.message} <em>({new Date(note.created_at).toLocaleString()})</em>
            </li>
          ))
        ) : (
          <li>No notifications available</li>
        )}
      </ul>
    </div>
  )
}

export default NotificationPanel
