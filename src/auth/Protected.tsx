import { Navigate, Outlet } from "react-router"
import useAuth from "../hooks/useAuth"

export default function Protected({roles} : {roles: string[]}) {
    const {user, loading} =  useAuth()

    if(loading) return <></>
    if(!loading && !user) return <Navigate to={"/auth/sign-in/roles"} replace />;
    if(user && !roles.includes(user.type)) return <Navigate to={"/auth/sign-in/roles"} replace />;

    return <Outlet />
}
