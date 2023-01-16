import { createContext, useState } from "react";
import { baseurl } from "../baseurl";
const ProductContext = createContext()
export default ProductContext;
export const ProductProvider = ({ children }) => {
    const getallproducts = (filterQuery) => {
        const responsedata = [
            {
                "name": "dhruv",
                "description": "nn,n,",
                "owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "current_owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "available": true,
                "id": 11,
                "photo1": "https://m.media-amazon.com/images/I/61dreOf9NzL.jpg",
                // "photo1": "/media/product_pics/plain-dosa_ODGvUwv.jpg",
                "photo2": null,
                "photo3": null,
                "photo4": null,
                "photo5": null
            },
            {
                "name": "dhruv2",
                "description": "nn,n,",
                "owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "current_owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "available": true,
                "id": 12,
                "photo1": "/media/product_pics/plain-dosa_iq1aAhu.jpg",
                "photo2": null,
                "photo3": null,
                "photo4": null,
                "photo5": null
            },
            {
                "name": "dhruv22",
                "description": "sffskhfk",
                "owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "current_owner": {
                    "username": "demon",
                    "email": "tanugarg1234567@gmail.com",
                    "first_name": "Tarun",
                    "last_name": "Garg",
                    "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                    "phone": "8815493056",
                    "college": "Indian Institute of Information Technology Bhopal",
                    "batch": "2021-2025",
                    "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                    "id": 3
                },
                "available": true,
                "id": 13,
                "photo1": "/media/product_pics/Screenshot_20221026_011733.png",
                "photo2": null,
                "photo3": null,
                "photo4": null,
                "photo5": null
            }
        ]
        const filterResponse = responsedata.filter((ele) => { return ele.name.toLowerCase().includes(filterQuery.toLowerCase()) })
        return filterResponse
        try {
            // let url=baseurl+'/api/products
            // const response=await fetch(url,{

            // })
            // const filterResponse=response.filter((ele)=>{return ele.name.toLowerCase().includes(filter.toLowerCase())})
            // return filterResponse
        }
        catch (err) {
            console.log(err)
        }
    }

    const productdetails = (id) => {
        const responsedata =
        {
            "name": "ljkjjk",
            "description": "nn,n,",
            "owner": {
                "username": "demon",
                "email": "tanugarg1234567@gmail.com",
                "first_name": "Tarun",
                "last_name": "Garg",
                "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                "phone": "8815493056",
                "college": "Indian Institute of Information Technology Bhopal",
                "batch": "2021-2025",
                "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                "id": 3
            },
            "current_owner": {
                "username": "demon",
                "email": "tanugarg1234567@gmail.com",
                "first_name": "Tarun",
                "last_name": "Garg",
                "address": "Jagtap ki goth madhavganj\r\nlashkar gwalior",
                "phone": "8815493056",
                "college": "Indian Institute of Information Technology Bhopal",
                "batch": "2021-2025",
                "profile_pic": "/media/profile_pics/Chicken-Lollipop.jpg",
                "id": 3
            },
            "available": true,
            "id": 11,
            "photo1": "https://m.media-amazon.com/images/I/61dreOf9NzL.jpg",
            // "photo1": "/media/product_pics/plain-dosa_ODGvUwv.jpg",
            "photo2": "https://m.media-amazon.com/images/I/51WRCFZ3tUL.jpg",
            "photo3": null,
            "photo4": null,
            "photo5": null
        }
        return responsedata
        // let url = baseurl + `api/products/${id}/`
        // try {
        //     const response = await fetch(url, {

        //     })
        //     return response
        // }
        // catch (err) {
        //     console.log(err);
        // }
    }

    const registerBook = async (details) => {
        let url = baseurl + ''
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         body: details
        //     })
        // }
        // catch (err) {
        //     console.log(err);
        // }
        console.log(details)
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