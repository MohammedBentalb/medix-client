import { Navigate, Outlet } from 'react-router'
import useAuth from '../hooks/useAuth'

export default function PublicOnly() {
    const {user, loading} = useAuth()
    if(loading) return null
    if(user) return <Navigate to={'/'} replace />

    return <Outlet /> 
}