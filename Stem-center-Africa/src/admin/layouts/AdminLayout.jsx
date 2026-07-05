import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import '../styles/AdminLayout.css'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout-shell">
      {/* Sidebar — always visible on desktop, toggleable on tablet/mobile */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay — only active when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="admin-layout-mobile-overlay"
        />
      )}

      {/* Main area — offset by sidebar width on desktop */}
      <div className="admin-layout-main admin-main">
        <AdminTopbar onMenuToggle={() => setSidebarOpen(prev => !prev)} />

        <div className="admin-layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
