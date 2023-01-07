import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import image from './bookbg.jpg'
import showeye from './showeye.png'
import hideeye from './hideeye.png'
import '../App.css'
export default function Register() {
    const myStyle = {
        backgroundColor: 'white',
        fontSize: '.9rem'
    }
    const passRef=useRef(null)
    const pass2Ref=useRef(null)
    
    const [credential, setCredential] = useState({ first_name:'',last_name:'',username: '', email: '', password: '', password2: '',address:'',college:'',batch:'',phone:'' })
    
    const [ishide,setIsHide]=useState(true)

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
        if (pass2Ref.current.value !== '') {
            if (passRef.current.value !== pass2Ref.current.value) {
                pass2Ref.current.style.color = 'red'
            }
            else {
                pass2Ref.current.style.color = 'black'
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let url = ''
        await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(credential)
        })

        //after submit code
    }
    
    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center p-4" style={{ minHeight: 'calc(30rem + 10vw)' }}>
                <div className="container row w-80 justify-content-center align-items-center rounded" style={{ ...myStyle, boxShadow: '0 0 20px grey', padding: 'calc(1.5rem + .5vw) calc(.5rem + 2.5vw) calc(1rem) calc(.5rem + 2.5vw)' }}>
                    <div className={`col-${window.screen.width > 720 ? 6 : 12}`}>
                        <h3 className='pb-4 fst-italic' style={{ fontSize: 'calc(1.3rem + .4vw)' }}>Ready to start your journey with us <span className="fst-normal">&#x1F60A;</span>   </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='first_name' className="form-control border-0 shadow-sm" required placeholder='First name' onChange={handleOnChange}/>
                                    <label htmlFor="first_name" className='px-4'>First Name *</label>
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='last_name' className="form-control border-0 shadow-sm" required placeholder='Last name' onChange={handleOnChange}/>
                                    <label htmlFor="last_name" className='px-4'>Last Name *</label>
                                </div>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="text" name='username' className="form-control border-0 shadow-sm" required placeholder='User name' onChange={handleOnChange}/>
                                <label htmlFor="username">User Name *</label>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="email" name='email' className="form-control border-0 shadow-sm" required placeholder='Email' onChange={handleOnChange}/>
                                <label htmlFor="email">Email *</label>
                            </div>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type={ishide?'password':'text'} name='password' className="form-control border-0 shadow-sm" required placeholder='Password' onChange={handleOnChange} ref={passRef}/>
                                    <label htmlFor="password" className='px-4'>Password *</label>
                                    <img src={ishide?hideeye:showeye}  alt={ishide?'show':'hide'}title={ishide?'show':'hide'} style={{cursor:'pointer',position:'absolute',right:'1.5rem',bottom:'1rem',width:'18px'}} onClick={()=>setIsHide(e=>!e)}/>
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type={ishide?'password':'text'} name='password2' className="form-control border-0 shadow-sm" required placeholder='Confirm Password' onChange={handleOnChange} ref={pass2Ref}/>
                                    <label htmlFor="password2" className='px-4'>Confirm Password *</label>
                                    <img src={ishide?hideeye:showeye}  alt={ishide?'show':'hide'}title={ishide?'show':'hide'} style={{cursor:'pointer',position:'absolute',right:'1.5rem',bottom:'1rem',width:'18px'}} onClick={()=>setIsHide(e=>!e)}/>
                                </div>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="text" name='address' className="form-control border-0 shadow-sm" required placeholder='Address' onChange={handleOnChange}/>
                                <label htmlFor="address">Address *</label>
                            </div>
                            <div className="row">
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="text" name='college' className="form-control border-0 shadow-sm" required placeholder='College' onChange={handleOnChange}/>
                                    <label htmlFor="college" className='px-4'>College *</label>
                                </div>
                                <div className="mb-4 col-md-6 form-floating">
                                    <input type="number" name='batch' className="form-control border-0 shadow-sm" required placeholder='Batch' min={1950} onChange={handleOnChange}/>
                                    <label htmlFor="batch" className='px-4'>Batch *</label>
                                </div>
                            </div>
                            <div className="mb-4 form-floating">
                                <input type="tel" name='phone' className="form-control border-0 shadow-sm" placeholder='Mobile No.' onChange={handleOnChange}/>
                                <label htmlFor="phone">Mobile No.</label>
                            </div>
                            <div className="mb-4 form-check">
                                <input type="checkbox" className="form-check-input" style={{ cursor: "pointer" }} required />
                                <label className="form-check-label" htmlFor="exampleCheck1">I agree to Terms & Conditions.</label>
                            </div>
                            <button type="submit" className="btn shadow-sm" disabled={credential.password === '' || credential.password !== credential.password2} style={{backgroundColor:'rgb(47 250 248)',color:"#161515",borderRadius:"20px",padding:"calc(.3rem + .2vw) calc(1.5rem + .5vw)",cursor:'pointer'}}>Register</button>
                        </form>
                        <p className='mt-3 mb-1 text-center'>Already have an account ? <Link to='/login'>Login</Link></p>
                    </div>
                    <div className={`col-${window.screen.width > 720 ? 6 : '0 d-none'}`}>
                        <img src={image} alt="" style={{ width: '100%' }} id='sideimage' />
                    </div>
                </div>
            </div>
        </>
    )
}