import { Navigate, Outlet } from "react-router"
import useAuth from "../hooks/useAuth"

export default function Protected({roles} : {roles: string[]}) {
    const {user} =  useAuth()

    if(!user) return <Navigate to={"/auth/sign-in/roles"} replace />;
    if(!roles.includes(user.type)) return <Navigate to={"/auth/sign-in/roles"} replace />;

    return <Outlet />
}
