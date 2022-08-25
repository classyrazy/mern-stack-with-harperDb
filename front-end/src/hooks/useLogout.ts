import { useContext, useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    async function logOut() {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"});
    }
    return {logOut};

}