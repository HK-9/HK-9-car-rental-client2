import {useState, useContex,  createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({childer}) =>{
    const [user, setUser] = useState(null);
    const login = user =>{
        setUser(user);
    }
    const logout = () =>{
        setUser(null)
    }
    return <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
}