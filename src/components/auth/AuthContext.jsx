import { createContext, useContext, useEffect, useState } from "react";
import dataFetch from "../../services/api";
/* The state of a user authentication or status*/

/* 
if authenticated pass the context as true
if not then false

how can we know if the user is authenticated?
where can we store it?

*/

export const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let accessToken = localStorage.getItem("access")
    let refreshToken = localStorage.getItem("refresh")
    /* 
    Three problems
    1. We should use dataFetch utils (Figure out to modify the header or just figure out how to sequentially use it)
    2. Loading and going directly to the page should work
    3. Using login should work
    */

    // Login -> Get Token -> Fetch Me Data with Token using Datafetch -> set is Authenticated

    const asyncFetchUser = async () => {
        setIsLoading(true)
        accessToken = localStorage.getItem("access")

        if (!accessToken) {
            return;
        }

        try {
            const data = await dataFetch("auth/users/me", "GET")

            localStorage.setItem("username", data.username);
            localStorage.setItem("email", data.email);
            localStorage.setItem("id", data.id);

            setIsAuthenticated(true);
        } catch (e) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(accessToken){
            asyncFetchUser();
        }else{
            setIsLoading(false)
        }

    }, []);

    useEffect(() => {
        window.addEventListener("storage", asyncFetchUser);
        return () => {
            window.removeEventListener("storage", asyncFetchUser);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}