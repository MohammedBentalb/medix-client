import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { userType } from "../types"
import api from "../lib/axios/api"
import axios from "axios"


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

    return (
    <AuthContext.Provider value={{user, setUser, token, setToken}}>{children}</AuthContext.Provider>
  )
}
