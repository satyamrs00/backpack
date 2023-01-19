import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../baseurl";
import useAxios from "../utils/useAxios";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
    const [loading, setLoading] = useState(false);

    const history = useNavigate();

    const loginUser = async (credential) => {
        setLoading(true)
        let url = baseurl + 'auth/token/'
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(credential)
        // });
        const response=await axios.post(url,credential)
        // const data = await response.json();
        setLoading(false)
        console.log(response)
        if (response.status=== 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            history("/");
        } else {
            alert("Something went wrong!");
        }
    };

    const registerUser = async (credential) => {
        setLoading(true)
        let url = baseurl + 'auth/register/'
        // const response = await fetch(url, {
        //     method: "POST",
        //     body: credential,
        //     headers:{
        //         'Content-Type':'multipart/form-data'
        //     },
        // });

        const response=await axios.post(url,credential)
        setLoading(false)
        console.log(response);
        if (response.status === 201) {
            history("/login");
        } else {
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history("/login");
    };

    const checkUser = () => {
        if (!user) {
            history('/login')
        }
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        checkUser,
        loading,
        setLoading
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};