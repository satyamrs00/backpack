import React, { useRef, useState,useContext,useEffect } from 'react'
import image from './images/contactus.png'
import ThemeContext from '../context/ThemeContext'
import '../App.css'

export default function ContactUs() {
    const {theme,myStyle,inputStyle}=useContext(ThemeContext)

    const [details, setDetails] = useState({})
    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch("https://submit-form.com/LSE2Q5et", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(details)
        })
        setDetails({})
        formRef.current.reset()
        //thankyou
        formDivRef.current.style.display = 'none'
        thankyouDivRef.current.style.display = 'block'

    }

    const formRef=useRef(null)
    const formDivRef=useRef(null)
    const thankyouDivRef=useRef(null)

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center p-4" style={{ minHeight: 'calc(30rem + 10vw)' }}>
                <div className="container row w-80 rounded" style={{ ...myStyle, boxShadow: '0 0 20px grey', padding: '1.5rem calc(.5rem + 2.5vw) calc(1rem) calc(.5rem + 2.5vw)' }}>
                    <div className={`col-${window.screen.width > 900 ? 6 : '0 d-none'} align-items-center d-flex`}>
                        <img src={image} alt="" id='sideimage' style={{ width: '100%',filter:`drop-shadow(8px 5px 4px ${theme==='light'?'#303030':'rgb(5 185 192)'})`}} />
                    </div>
                    <div className={`col-${window.screen.width > 900 ? 6 : 12}`}>
                        <div ref={formDivRef} style={{display:'block'}}>
                            <h3 className=' pb-2 fst-italic' style={{ fontSize: 'calc(1.3rem + .4vw)' }}>Contact Us <span className='fst-normal'>
                                &#128075;</span></h3>
                            <form onSubmit={handleSubmit} ref={formRef}>
                                <div className="mb-4 form-floating">
                                    <input  type="text" name='name' className="form-control border-0 shadow-sm" required onChange={handleOnChange} placeholder='Name' style={{...inputStyle}}/>
                                    <label htmlFor="name">Username *</label>
                                </div>
                                <div className="mb-4 form-floating">
                                    <input  type="email" name='email' className="form-control border-0 shadow-sm" required onChange={handleOnChange} placeholder='Email' style={{...inputStyle}}/>
                                    <label htmlFor="email">Email *</label>
                                </div>
                                <div className="mb-4 form-floating">
                                    <input  type="text" name='mobile' className="form-control border-0 shadow-sm" onChange={handleOnChange} placeholder='mobile' pattern='[0-9]{10}' style={{...inputStyle}}/>
                                    <label htmlFor="mobile">Mobile No.</label>
                                </div>
                                <div className="mb-4">
                                    <textarea name='message' className="form-control border-0 shadow-sm" required onChange={handleOnChange} placeholder='Message *' style={{fontSize: "calc(1rem + .1vw)", height: '8rem',...inputStyle }} />
                                </div>
                                <button type="submit" className="btn shadow-sm btnBg" style={{ borderRadius: "20px", padding: "calc(.3rem + .2vw) calc(1.5rem + .5vw)", cursor: 'pointer', float: 'right' }}>Send</button>
                            </form>
                        </div>
                        <div className="text-center" ref={thankyouDivRef} style={{ display: 'none', height: '264px', paddingTop: '60px' }}>
                            <i className="fa-solid fa-circle-check fa-4x"></i>
                            <p style={{ fontSize: '2.2rem', marginBottom: '0' }}>Thank You</p>
                            <p style={{ fontSize: '1.1rem' }}>Your feedback submitted successfully</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
