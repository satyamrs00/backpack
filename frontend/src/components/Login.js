import React, { useState, useEffect, useRef } from 'react'
import image from './bookbg.jpg'
import showeye from './showeye.png'
import hideeye from './hideeye.png'
import { Link } from 'react-router-dom'
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import '../App.css'

export default function Login() {
    const myStyle = {
        backgroundColor: 'white',
        fontSize: '.9rem'
    }

    const captchaRef = useRef(null)
    const captchaParaRef = useRef(null)
    const [ishide,setIsHide]=useState(true)
    
    const [credential, setCredential] = useState({ email: '', password: '' })

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateCaptcha(captchaRef.current.value) === false) {
            captchaParaRef.current.style.visibility = 'visible'
            captchaRef.current.style.color = 'red'
            setTimeout(() => {
                captchaParaRef.current.style.visibility = 'hidden'
                captchaRef.current.style.color = 'black'
            }, 3000)
            return false
        }

        let url = ''
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credential)
        })

        //after submit code
    }

    useEffect(() => {
        loadCaptchaEnginge(5);
    }, [])

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center p-4" style={{ minHeight: 'calc(30rem + 10vw)' }}>
                <div className="container row w-80 justify-content-center align-items-center rounded" style={{ ...myStyle, boxShadow: '0 0 20px grey', padding:  'calc(1.5rem + .5vw) calc(.5rem + 2.5vw) calc(1rem) calc(.5rem + 2.5vw)' }}>
                    <div className={`col-${window.screen.width > 720 ? 6 : 12}`}>
                        <h3 className=' pb-4 fst-italic' style={{ fontSize: 'calc(1.3rem + .4vw)' }}>Happy to see you again <span className='fst-normal'>&#x1F60A;</span></h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 form-floating">
                                <input type="email" name='email' className="form-control border-0 shadow-sm" required onChange={handleOnChange} placeholder='Email' />
                                <label htmlFor="email">Email *</label>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type={ishide?'password':'text'} name='password' className="form-control border-0 shadow-sm" required placeholder='Password' onChange={handleOnChange}/>
                                <label htmlFor="password">Password *</label>
                                <img src={ishide?hideeye:showeye}  alt={ishide?'show':'hide'}title={ishide?'show':'hide'} style={{cursor:'pointer',position:'absolute',right:'1.5rem',bottom:'1rem',width:'18px'}} onClick={()=>setIsHide(e=>!e)}/>
                            </div>
                            <div style={{color:'grey',fontSize:'1rem',marginBottom:'calc(2vw)'}} >
                                <LoadCanvasTemplateNoReload />
                                <label htmlFor="captchaInp" className='mt-2'>Enter security code : &nbsp;</label>
                                <input type="text" className="form-control shadow-sm border-0" name='captchaInp' style={{ width: 'calc(6rem + 4vw)', padding: '2px 10px', display: 'inline-block' }} ref={captchaRef} required />&nbsp;
                                <span className='text-danger captchaPara' style={{ visibility: 'hidden' }} ref={captchaParaRef}> Invalid security code</span>
                            </div>
                            <button type="submit" className="btn shadow-sm" style={{backgroundColor:'rgb(47 250 248)',color:"#161515",borderRadius:"20px",padding:"calc(.3rem + .2vw) calc(1.5rem + .5vw)",cursor:'pointer'}}>Login</button>
                        </form>
                        <p className='mt-4 mb-0 text-center'>Not have an account ? <Link to='/register'>Register</Link></p>
                    </div>
                    <div className={`col-${window.screen.width > 720 ? 6 : '0 d-none'}`}>
                        <img src={image} alt="" id='sideimage' style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </>
    )
}
