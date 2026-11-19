import { useState } from 'react'
import { Router } from './routes'
import { PublicLayout } from './layouts/PublicLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { AuthLayout } from './layouts/AuthLayout'
import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const page = <Router path={path} navigate={navigate} />
  if (path.startsWith('/admin')) return <AdminLayout navigate={navigate}>{page}</AdminLayout>
  if (path === '/login' || path === '/forgot-password' || path === '/reset-password') return <AuthLayout navigate={navigate}>{page}</AuthLayout>
  return <PublicLayout path={path} navigate={navigate}>{page}</PublicLayout>
}

export default App
