import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import available from './images/available.png'
import notavailable from './images/notavailable.png'
import AuthContext from "../context/AuthContext";
import ThemeContext from '../context/ThemeContext'
import Loading from './Loading'

export default function ProductDetails() {
    const { myStyle } = useContext(ThemeContext)
    const { checkUser } = useContext(AuthContext)
    useEffect(() => { checkUser() }, [])

    const handleClick = (e) => {
        e.target.innerText = 'Requested'
        e.target.disabled = 'true'
    }

    const location = useLocation()
    const data = location.state.object
    const imageArr = []
    if (data.photo1) { imageArr.push(data.photo1) }
    if (data.photo2) { imageArr.push(data.photo2) }
    if (data.photo3) { imageArr.push(data.photo3) }
    if (data.photo4) { imageArr.push(data.photo4) }
    if (data.photo5) { imageArr.push(data.photo5) }
    return (
        <>
            <div style={{ ...myStyle, boxShadow: '0 0 10px grey', padding: '1.5rem', border: "4px outset lightgrey" }} className='container rounded-3'>
                <div className="row">
                    <div className={`col-${window.screen.width > 900 ? 6 : 12} d-flex justify-content-center rounded`}>
                        <Carousel images={imageArr} width='calc(10rem + 25vw)' height='calc(12rem + 23vw)' />
                    </div>
                    <div style={{ fontFamily: 'serif' }} className={`col-${window.screen.width > 900 ? 6 : 12}`}>
                        <div className='row' style={{ padding: '1rem 1.5rem .1rem 1.5rem' }}>
                            <h5 className='col' style={{ fontSize: 'calc(1.7rem + .3vw)' }}>{data.name}</h5>
                            <img className='col-2' src={data.available ? available : notavailable} alt={data.available ? 'available' : 'not available'} style={{ width: 'calc(3.5rem + .5vw)', height: "calc(2rem + .5vw)" }} />
                        </div>
                        <div style={{ padding: '1rem 1.5rem .5rem 1.5rem' }}>
                            <h6 style={{ fontSize: 'calc(1rem + .3vw)', fontWeight: '600' }}>Description</h6>
                            <p style={{ fontSize: 'calc(.9rem + .3vw)' }}>{data.description}</p>
                        </div>
                        <div style={{ padding: '0rem 1.5rem .5rem 1.5rem' }}>
                            <h6 style={{ fontSize: 'calc(1rem + .3vw)' }}>Owner : <span style={{ fontWeight: '900' }}>{data.owner.first_name + " " + data.owner.last_name}</span></h6>
                            <h6 style={{ fontSize: 'calc(1rem + .3vw)' }}>Current Owner : <span style={{ fontWeight: '900' }}>{data.current_owner.first_name + " " + data.current_owner.last_name}</span></h6>
                        </div>
                        <div className="footer d-flex justify-content-end" style={{ backgroundColor: 'rgb(187 187 187)', padding: '.5rem 1rem' }}>
                            {data.available && <button className='btn shadow-sm' style={{ backgroundColor: "orange", fontWeight: '600', color: '#404040' }} onClick={handleClick}>Request Book</button>}
                            {!data.available && <span className='text-danger p-1'>Currently unavailable</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
