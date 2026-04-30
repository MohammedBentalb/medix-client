import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { TUser } from "../types";
import api, { setAccessToken } from "../lib/axios/api";



type TContextData = {
    user: TUser | null,
    token: string,
    loading: boolean,
    setUser: Dispatch<SetStateAction<TUser | null>>,
    setToken: Dispatch<SetStateAction<string>>,
}


export const AuthContext = createContext<TContextData | undefined>(undefined)

export default function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<TUser | null>(null);
    const [token, setToken] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(true);
    useEffect(() => {
      const refetch = async () => {
        console.log('running')
        try{
          setLoading(true)
            const request = await api.post("/auth/refresh", {})
            setUser(request.data.data.user)
            setToken(request.data.data.accessToken)
            setAccessToken(request.data.data.accessToken)
            setLoading(false)
            console.log(request.data.data)
          }catch(e: unknown){
            setLoading(false)
            console.log('eeeer')
          }
      }
      refetch()
      console.log('hi there')
    }, []);


    return (
    <AuthContext.Provider value={{user, setUser, token, setToken, loading}}>{children}</AuthContext.Provider>
  )
}
