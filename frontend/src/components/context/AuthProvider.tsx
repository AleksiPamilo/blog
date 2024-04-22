"use client";

import { IUser } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: IUser | null;
    login: (token: string, user: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
    }, []);

    const login = (token: string, user: IUser) => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `jwt=${token}; secure; httpOnly`;
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
    };

    const logout = () => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
