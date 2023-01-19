import React, { useRef, useState, useContext ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import image from './images/bookbg.png'
import showeye from './images/showeye.png'
import hideeye from './images/hideeye.png'
import AuthContext from "../context/AuthContext";
import '../App.css'
import ThemeContext from '../context/ThemeContext'

export default function Register() {
    const { registerUser } = useContext(AuthContext);
    const {theme,myStyle,inputStyle}=useContext(ThemeContext)

    const passRef = useRef(null)
    const pass2Ref = useRef(null)

    const [credential, setCredential] = useState({ first_name: 'dhruv', last_name: 'rajpoot', username: 'dhruv', email: '1@1.com', password: 'Dhruv123', password2: 'Dhruv123', address: 'bhopall', college: 'IIIT', batch: '2025', phone: '4565' })

    const [ishide, setIsHide] = useState(true)

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
        if (pass2Ref.current.value !== '') {
            if (passRef.current.value !== pass2Ref.current.value) {
                pass2Ref.current.style.color = 'red'
            }
            else {
                pass2Ref.current.style.color = inputStyle.color
            }
        }
    }

    const formData = new FormData()
    const handleSubmit = async (e) => {
        e.preventDefault()
        for (const ele in credential) {
            formData.append(ele, credential[ele])
        }
        registerUser(formData);
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center p-4" style={{ minHeight: 'calc(30rem + 10vw)' }}>
                <div className="container row w-80 justify-content-center align-items-center rounded" style={{ ...myStyle, boxShadow: '0 0 20px grey', padding: 'calc(1.5rem + .5vw) calc(.5rem + 2.5vw) calc(1rem) calc(.5rem + 2.5vw)' }}>
                    <div className={`col-${window.screen.width > 900 ? 6 : 12}`}>
                        <h3 className='pb-4 fst-italic' style={{ fontSize: 'calc(1.3rem + .4vw)' }}>Ready to start your journey with us <span className="fst-normal">&#x1F60A;</span>   </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='first_name' className="form-control border-0 shadow-sm"  placeholder='First name' onChange={handleOnChange} style={{...inputStyle}}/>
                                    <label htmlFor="first_name" className='px-4'>First Name *</label>
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='last_name' className="form-control border-0 shadow-sm"  placeholder='Last name' onChange={handleOnChange} style={{...inputStyle}}/>
                                    <label htmlFor="last_name" className='px-4'>Last Name *</label>
                                </div>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="text" name='username' className="form-control border-0 shadow-sm"  placeholder='User name' onChange={handleOnChange} style={{...inputStyle}}/>
                                <label htmlFor="username">User Name *</label>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="email" name='email' className="form-control border-0 shadow-sm"  placeholder='Email' onChange={handleOnChange} style={{...inputStyle}}/>
                                <label htmlFor="email">Email *</label>
                            </div>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type={ishide ? 'password' : 'text'} name='password' className="form-control border-0 shadow-sm"  placeholder='Password' onChange={handleOnChange} ref={passRef} pattern='(?=.*\d)(?=.*[a-z]).{8,}' title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" style={{...inputStyle}}/>
                                    <label htmlFor="password" className='px-4'>Password *</label>
                                    <img src={ishide ? hideeye : showeye} alt={ishide ? 'show' : 'hide'} title={ishide ? 'show' : 'hide'} style={{ cursor: 'pointer', position: 'absolute', right: '1.5rem', bottom: '1rem', width: '18px' }} onClick={() => setIsHide(e => !e)} />
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type={ishide ? 'password' : 'text'} name='password2' className="form-control border-0 shadow-sm"  placeholder='Confirm Password' onChange={handleOnChange} ref={pass2Ref} minLength={8} style={{...inputStyle}}/>
                                    <label htmlFor="password2" className='px-4'>Confirm Password *</label>
                                    <img src={ishide ? hideeye : showeye} alt={ishide ? 'show' : 'hide'} title={ishide ? 'show' : 'hide'} style={{ cursor: 'pointer', position: 'absolute', right: '1.5rem', bottom: '1rem', width: '18px' }} onClick={() => setIsHide(e => !e)} />
                                </div>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="text" name='address' className="form-control border-0 shadow-sm"  placeholder='Address' onChange={handleOnChange} style={{...inputStyle}}/>
                                <label htmlFor="address">Address *</label>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="text" name='college' className="form-control border-0 shadow-sm"  placeholder='College' onChange={handleOnChange} style={{...inputStyle}}/>
                                <label htmlFor="college">College *</label>
                            </div>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="" name='batch' className="form-control border-0 shadow-sm"  placeholder='Batch' min={1950} onChange={handleOnChange} style={{...inputStyle}}/>
                                    <label htmlFor="batch" className='px-4'>Batch *</label>
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='phone' className="form-control border-0 shadow-sm" placeholder='Mobile No.' onChange={handleOnChange} pattern='[0-9]{10}' title='invalid phone number'  style={{...inputStyle}}/>
                                    <label htmlFor="phone" className='px-4'>Mobile No.</label>
                                </div>
                            </div>
                            <div className={`mb-4 shadow-sm py-4 px-3 text-${theme==='light'?'dark':'light'}`} style={{...inputStyle}}>
                                <span>Profile : * </span><label><span className='fileInpStyleBtn ms-1'><i className="fa-solid fa-upload me-1"></i>Upload Profile</span><input type="file" name="profile_pic" className='fileInpBtn ms-2' onChange={(e) => { formData.append('profile_pic', e.target.files[0]) }}  /></label>
                            </div>
                            <div className="mb-4 form-check">
                                <input type="checkbox" className="form-check-input shadow-none" style={{ cursor: "pointer"}} />
                                <label className="form-check-label" htmlFor="exampleCheck1">I agree to Terms & Conditions.</label>
                            </div>
                            <button type="submit" className="btn shadow-sm btnBg" disabled={credential.password === '' || credential.password !== credential.password2} style={{ borderRadius: "20px", padding: "calc(.3rem + .2vw) calc(1.5rem + .5vw)", cursor: 'pointer' }}>Register</button>
                        </form>
                        <p className='mt-3 mb-1 text-center'>Already have an account ? <Link to='/login'>Login</Link></p>
                    </div>
                    <div className={`col-${window.screen.width > 720 ? 6 : '0 d-none'}`}>
                        <img src={image} alt="" style={{ width: '100%',filter:`drop-shadow(7px 5px 4px ${theme==='light'?'#303030':'rgb(5 185 192)'})`}} id='sideimage' />
                    </div>
                </div>
            </div>
        </>
    )
}
