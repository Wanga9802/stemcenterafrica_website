import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'

export default function ProtectedAdminRoute() {
  const { session, loading } = useAdminAuth()

  if (loading || session === undefined) {
    return <div>Checking admin access…</div>
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
