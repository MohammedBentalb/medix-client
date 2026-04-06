import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { TUser } from "../types";



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
