import React, { useState, useEffect, useRef, useContext } from 'react'
import image from './images/bookbg2.png'
import showeye from './images/showeye.png'
import hideeye from './images/hideeye.png'
import { Link, useNavigate } from 'react-router-dom'
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import AuthContext from "../context/AuthContext";
import ThemeContext from '../context/ThemeContext'
import '../App.css'
import Loading from './Loading'

export default function Login() {
    const navigate = useNavigate()
    const { loginUser, loading, user } = useContext(AuthContext);
    useEffect(() => { if (user) { navigate('/') } }, [])
    const { theme, myStyle, inputStyle } = useContext(ThemeContext)

    const captchaRef = useRef(null)
    const captchaParaRef = useRef(null)

    const [ishide, setIsHide] = useState(true)
    const [showError, setShowError] = useState(false)

    const [credential, setCredential] = useState({})

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
        const responsestatus = await loginUser(credential);
        if (responsestatus === 401) {
            setShowError(true)
        }
        else if (responsestatus === 200) {
            setShowError(false)
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(5);
    }, [showError])

    return (
        <>
            {loading && <Loading />}
            {!loading &&
                <div className="container-fluid d-flex justify-content-center align-items-center p-4" style={{ minHeight: 'calc(30rem + 10vw)' }}>
                    <div className="container row w-80 justify-content-center align-items-center rounded" style={{ ...myStyle, boxShadow: '0 0 20px grey', padding: 'calc(1.5rem + 1vw) calc(.5rem + 2.5vw) calc(1rem) calc(.5rem + 2.5vw)' }}>
                        <div className={`alert alert-danger d-${showError ? 'block' : 'none'}`} role="alert">
                            <strong>Login Failed ! </strong>&nbsp; Please try to login with correct credentials
                        </div>
                        <div className={`col-${window.screen.width > 900 ? 6 : 12}`}>
                            <h3 className=' pb-4 fst-italic' style={{ fontSize: 'calc(1.3rem + .4vw)' }}>Happy to see you again <span className='fst-normal'>&#x1F60A;</span></h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 form-floating">
                                    <input type="text" name='username' className="form-control border-0 shadow-sm" required onChange={handleOnChange} placeholder='Username' style={{ ...inputStyle }} />
                                    <label htmlFor="username">Username *</label>
                                </div>
                                <div className="mb-4 form-floating">
                                    <input type={ishide ? 'password' : 'text'} name='password' className="form-control border-0 shadow-sm" required placeholder='Password' onChange={handleOnChange} style={{ ...inputStyle }} />
                                    <label htmlFor="password">Password *</label>
                                    <img src={ishide ? hideeye : showeye} alt={ishide ? 'show' : 'hide'} title={ishide ? 'show' : 'hide'} style={{ cursor: 'pointer', position: 'absolute', right: '1.5rem', bottom: '1rem', width: '18px' }} onClick={() => setIsHide(e => !e)} />
                                </div>
                                <div style={{ fontSize: '1rem', marginBottom: 'calc(2vw)' }} >
                                    <div style={{ height: '2.5rem' }}>
                                        <LoadCanvasTemplateNoReload />
                                    </div>
                                    <label htmlFor="captchaInp" className='mt-2'>Enter security code : &nbsp;</label>
                                    <input type="text" className="form-control shadow-sm border-0" name='captchaInp' style={{ width: 'calc(6rem + 4vw)', padding: '5px 10px', display: 'inline-block', ...inputStyle }} ref={captchaRef} required />&nbsp;
                                    <span className='text-danger captchaPara' style={{ visibility: 'hidden' }} ref={captchaParaRef}> Invalid security code</span>
                                </div>
                                <button type="submit" className="btn shadow-sm btnBg" style={{ borderRadius: "20px", padding: "calc(.3rem + .2vw) calc(1.5rem + .5vw)", cursor: 'pointer' }}>Login</button>
                            </form>
                            <p className='mt-4 mb-0 text-center'>Not have an account ? <Link to='/register'>Register</Link></p>
                        </div>
                        <div className={`col-${window.screen.width > 720 ? 6 : '0 d-none'} d-flex justify-content-center`}>
                            <img src={image} alt="" id='sideimage' style={{ width: '60%', filter: `drop-shadow(7px 5px 4px ${theme === 'light' ? '#303030' : 'rgb(5 150 152)'})` }} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
