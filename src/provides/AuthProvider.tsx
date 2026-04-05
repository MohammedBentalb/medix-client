import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { userType } from "../types"


type TUser = {
    id: string,
    email: string
    firstName: string,
    lastName: string,
    phone: string,
    image: string,
    nationalId: string,
    type: userType,
    status: string,
}

type TContextData = {
    user: TUser | null,
    token: string,
    setUser: Dispatch<SetStateAction<TUser | null>>,
    setToken: Dispatch<SetStateAction<string>>,
}


export const AuthContext = createContext<TContextData | undefined>(undefined)

export default function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<TUser | null>(null);
    const [token, setToken] = useState<string>('');

    useEffect(()=>{
        console.log(user)
        console.log(token)
    }, [user, token])

    return (
    <AuthContext.Provider value={{user, setUser, token, setToken}}>{children}</AuthContext.Provider>
  )
}
