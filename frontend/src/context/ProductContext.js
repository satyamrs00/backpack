import { createContext, useContext, useEffect, useState } from "react";
import { baseurl } from "../baseurl";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";
const ProductContext = createContext()
export default ProductContext;
export const ProductProvider = ({ children }) => {
    const { loading, setLoading,authTokens } = useContext(AuthContext)
    const api=useAxios()
    const getallproducts = async (filterQuery) => {
        setLoading(true)
        try {
            let url = baseurl + 'api/products/'
            const response = await fetch(url, {
                method:'GET',
                headers:{
                    Authorization:'Bearer '+authTokens.access
                }
            })
            const filterResponse = response.filter((ele) => { return ele.name.toLowerCase().includes(filterQuery.toLowerCase()) })
            setLoading(false)
            return filterResponse
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const registerBook = async (details) => {
        setLoading(true)
        let url = baseurl + 'api/products/'
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: details,
                headers:{
                    Authorization:'Bearer '+authTokens.access
                }
            })
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
        console.log(details)
    }

    const productdetails = async (id) => {
        setLoading(true)
        let url = baseurl + `api/products/${id}/`
        try {
            const response = await fetch(url, {
                method:'GET',
                headers:{
                    Authorization:'Bearer '+authTokens.access
                }
            })
            setLoading(false)
            return response
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const [profileData,setProfileData]=useState({})
    const profile = async() => {
        setLoading(true)
        let url = baseurl + 'api/profile/'
        try {
            const response = await api.get(url)
            setProfileData(response.data)
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }   
    }
    useEffect(()=>{
        profile()
    },[])

    const contextData = {
        getallproducts,
        productdetails,
        profile,
        profileData
    }

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}