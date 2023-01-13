import { createContext,useState } from "react";
const ProductContext=createContext()
export default ProductContext;
export const ProductProvider=({children})=>{
    const [loading, setLoading] = useState(true);
    const getallproduct=async()=>{
        let url=''
        const response=await fetch(url,{

        })
        console.log(response)
    }

    const contextData={
        getallproduct
    }
    return(
        <ProductContext.Provider value={contextData}>
            {loading?null:children}
        </ProductContext.Provider>
    )
}