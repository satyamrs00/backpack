import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import image from './images/bookbg.jpg'
import available from './images/available.png'
import notavailable from './images/notavailable.png'
import AuthContext from "../context/AuthContext";

export default function ProductDetails() {
    const navigate = useNavigate()
    let { user } = useContext(AuthContext);

    // useEffect(() => {
    //     if (!user) { navigate('/login') }
    //     // eslint-disable-next-line
    // }, [])

    // eslint-disable-next-line
    const myStyle = {
        backgroundColor: 'white'
    }

    // eslint-disable-next-line
    const [isAvailable, setIsAvailable] = useState(false)

    return (
        <>
            <div style={{ ...myStyle, margin: '.5rem calc(.1rem + 1.4vw)', boxShadow: '0 0 8px grey' }}>
                <div className="container-fluid" style={{ borderBottom: '4px solid lightgrey' }}>
                    <Carousel images={[image, image, image, image, image, image]} />
                </div>
                {/* <hr style={{ height: '5px', color: 'grey' ,margin:'0 0 1rem 0'}} /> */}
                <div style={{ fontFamily: 'serif' }}>
                    <div className='row' style={{ padding: '1rem 1.5rem .1rem 1.5rem' }}>
                        <h5 className='col' style={{ fontSize: 'calc(1.2rem + .3vw)' }}>Lorem ipsum dolor sit amet. lorem5</h5>
                        <img className='col-2' src={isAvailable ? available : notavailable} alt={isAvailable ? 'available' : 'not available'} style={{ width: 'calc(4rem + .5vw)', height: "calc(2.5rem + .5vw)" }} />
                    </div>
                    <div style={{ borderBottom: '4px solid lightgrey', padding: '1rem 1.5rem .5rem 1.5rem' }}>
                        <h6 style={{ fontSize: 'calc(1rem + .3vw)', fontWeight: '600' }}>Description</h6>
                        <p style={{ fontSize: 'calc(.9rem + .3vw)' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur voluptatibus, quaerat praesentium non, dicta eius enim ab, fuga magnam alias laudantium temporibus animi. Omnis voluptates ducimus nisi beatae pariatur reprehenderit quia expedita quibusdam non impedit eaque sed, ut maxime qui! Cumque ipsam laborum maxime blanditiis! Officiis enim dolore eum harum.</p>
                    </div>
                    <div style={{ borderBottom: '4px solid lightgrey', padding: '1rem 1.5rem .5rem 1.5rem' }}>
                        <h6 style={{ fontSize: 'calc(1rem + .3vw)' }}>Owner : <span style={{ fontWeight: '900' }}>Dhruv</span></h6>
                        <h6 style={{ fontSize: 'calc(1rem + .3vw)' }}>Current Owner : <span style={{ fontWeight: '900' }}>Dhruv</span></h6>
                    </div>
                </div>
                <div className="footer d-flex justify-content-end" style={{ backgroundColor: '#e1e1e1', padding: '.5rem 1rem' }}>
                    <button className='btn shadow-sm' disabled={!isAvailable} style={{ backgroundColor: "orange", fontWeight: '600', color: '#404040' }}>Lend Now</button>
                </div>
            </div>
        </>
    )
}
