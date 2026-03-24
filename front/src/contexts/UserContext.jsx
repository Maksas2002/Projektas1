import axios from "axios";
import { createContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchAuthUser = async () => {
        try {
            const responses = await axios.get(`${API_URL}/users/me`, {
                withCredentials:true,
            });
            
            setUser(responses.data.data);
        } catch (error) {
            console.log(error);
        }
      }
      fetchAuthUser();
    }, [])

    return(
        <UserContext value={{user, setUser}}>
            {children}
        </UserContext>
    );
}