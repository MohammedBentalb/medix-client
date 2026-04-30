import { Navigate, Outlet } from "react-router"
import { Loader2 } from "lucide-react"
import useAuth from "../hooks/useAuth"

export default function Protected({roles} : {roles: string[]}) {
    const {user, loading} =  useAuth()

    if(loading) return (
        <div className="flex bg-red-500 items-center justify-center w-screen h-screen">
            <Loader2 className="animate-spin" />
        </div>
    )
    if(!loading && !user) return <Navigate to={"/auth/sign-in/roles"} replace />;
    if(user && !roles.includes(user.type)) return <Navigate to={"/auth/sign-in/roles"} replace />;

    return <Outlet />
}
