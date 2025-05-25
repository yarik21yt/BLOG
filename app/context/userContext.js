"use client"
import { createContext, useContext, useState } from "react"

const UserContext = createContext(null)

export function UserProvider({initionalUser, children}) {
    const [user, setUser] = useState(initionalUser)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext)
}