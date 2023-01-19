import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../baseurl";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";
const ProductContext = createContext()
export default ProductContext;
export const ProductProvider = ({ children }) => {
    const navigate=useNavigate()
    const { loading, setLoading, authTokens } = useContext(AuthContext)
    const api = useAxios()
    const [productsData, setProductsData] = useState([])
    const getallproducts = async () => {
        setLoading(true)
        try {
            let url = baseurl + 'api/products/';
            const response = await api.get(url);
            setProductsData(response.data)
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const registerBook = async (details) => {
        setLoading(true)
        let url = baseurl + 'api/products/'
        try {
            const response = await api.post(url, details)
            navigate('/product')
            getallproducts()
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const productdetails = async (id) => {
        setLoading(true)
        let url = baseurl + `api/products/?id=${id}`
        try {
            const response = await api.get(url)
            setLoading(false)
            return response
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const [profileData, setProfileData] = useState({})
    const profile = async () => {
        let url = baseurl + 'api/profile/'
        try {
            const response = await api.get(url)
            setProfileData(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        profile()
        getallproducts()
    }, [])

    const contextData = {
        getallproducts,
        productdetails,
        profile,
        profileData,
        productsData,
        registerBook
    }

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}