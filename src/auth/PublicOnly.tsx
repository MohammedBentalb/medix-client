import { Navigate, Outlet } from 'react-router'
import useAuth from '../hooks/useAuth'

export default function PublicOnly() {
    const {user} = useAuth()
    if(user) return <Navigate to={'/'} replace />

    return <Outlet /> 
}