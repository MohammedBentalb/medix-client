import { useContext } from "react";
import { AuthContext } from "../provides/AuthProvider";

export default function useAuth() {
    const context = useContext(AuthContext)
    if(!context) throw new Error('using auth context outside context')
    
    return context;
}
