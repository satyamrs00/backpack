import { createContext, useContext, useState } from "react";
import { baseurl } from "../baseurl";
import AuthContext from "./AuthContext";
const ProductContext = createContext()
export default ProductContext;
export const ProductProvider = ({ children }) => {
    const { loading, setLoading } = useContext(AuthContext)
    const getallproducts = async (filterQuery) => {
        setLoading(true)
        try {
            let url = baseurl + '/api/products'
            const response = await fetch(url, {

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
        let url = baseurl + ''
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: details
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

            })
            setLoading(false)
            return response
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const contextData = {
        getallproducts,
        productdetails
    }

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}