import { useContext, useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();
    async function login(email: string, password: string) {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();
        if (!response.ok) {
            setLoading(false);
            setError(data.error);
        }
        if (response.ok) {
            // save user to localStorage
            localStorage.setItem("user", JSON.stringify(data));

            // dispatch user to context
            dispatch({type: "LOGIN", payload: data});
            setLoading(false);
            setError(null);
        }
    }
    return {login, error, loading};

}