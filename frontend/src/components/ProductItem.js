import React, { useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthContext";
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import image from './images/bookbg.jpg'
import available from './images/available.png'
import notavailable from './images/notavailable.png'

export default function ProductItem(props) {
    const product = props.item
    const navigate = useNavigate()
    let { user } = useContext(AuthContext);
    let { productdetails } = useContext(ProductContext)
    // useEffect(() => {
    //     if (!user) {navigate('/login')}
    //     // eslint-disable-next-line
    // }, [])
    // eslint-disable-next-line
    const [isAvailable, setIsAvailable] = useState(product.available)

    const [data, setData] = useState([])
    useEffect(()=>{
        setData(productdetails(product.id))
        //eslint-disable-next-line
    },[])

    const handleClick = () => {
        navigate('/product/details',{
            state:{object:data}
        })
    }
    return (
        <>
            <div className="card" style={{ width: '18rem', border: '3px outset whitesmoke', boxShadow: '0 0 5px grey' }}>
                <img src={product.photo1} className="card-img-top" alt="..." style={{ height: 'calc(15rem + 2vw)' }} />
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col" style={{ fontFamily: 'Courgette' }}>{product.name}</h5>
                        <img className='col-2' src={isAvailable ? available : notavailable} alt={isAvailable ? 'available' : 'not available'} style={{ width: 'calc(3rem + .5vw)', height: "calc(1.5rem + .5vw)" }} />
                    </div>
                    <button onClick={handleClick} className="btn btn-sm rounded mt-2 shadow-sm btnBg" style={{ fontFamily: "Courgette" }}>More Details</button>
                </div>
            </div>
        </>
    )
}