import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import Modal from 'react-bootstrap/Modal';
import '../App.css'
import '../styles.css'

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext)
    const location = useLocation()
    if (location.pathname === '/') document.title = 'BackPack - Home'
    else {
        let name = location.pathname.slice(1)
        let capitalize = name[0].toUpperCase() + name.slice(1)
        document.title = 'BackPack - ' + capitalize
    }
    const handleClick = () => {
        handleShow()
    }

    //logouot confirmation modals functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* logout confirmation modal */}
                <Modal dialogClassName="modal-20w" show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible'}} size={'sm'} centered>
                    <Modal.Body style={{ padding: '1.5rem'}}>
                        <p style={{ fontSize: 'calc(1.2rem + .2vw)' }}>Are you sure to Log out?</p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-danger shadow-sm" onClick={() => { logoutUser(); handleClose() }}>Log Out</button>
                            <button className="btn shadow-sm" onClick={handleClose}>Cancel</button>
                        </div>
                    </Modal.Body>
                </Modal>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg sticky-top py-1" style={{ background: 'white' }}>
                <div className="container-fluid position-relative" >
                    <Link className="navbar-brand" style={{ fontWeight: '500', fontSize: 'calc(1.8rem + .8vw)', color: '#181818', marginLeft: '1.5vw', fontFamily: 'sans-serif' }} to='/'>BackPack</Link>
                    <button className="navbar-toggler shadow-sm border-0 menuBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-caret-down"></i>
                        <i className="fa-solid fa-caret-up"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className={`fs-5 nav-link ${location.pathname === '/about' ? 'text-dark' : "text-secondary"}`} style={{ fontSize: 'calc(1rem + .2vw)', margin: "0 .8rem" }} aria-current="page" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`fs-5 nav-link ${location.pathname === '/product' ? 'text-dark' : "text-secondary"}`} style={{ fontSize: 'calc(1rem + .2vw)', margin: "0 .8rem" }} to="/product">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`fs-5 nav-link ${location.pathname === '/contact' ? 'text-dark' : "text-secondary"}`} style={{ fontSize: 'calc(1rem + .2vw)', margin: "0 .8rem" }} to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        <div className="d-flex ms-2">
                            {!user && location.pathname === '/login' && <Link className="btn text-dark shadow-sm btnBg me-4  fs-5" to="/register" role="button" style={{ padding: 'calc(.3rem + .3vw) calc(.5rem + .5vw)' }}><i className="fa-solid fa-user-plus fa-sm"></i> &nbsp;Register</Link>}
                            {!user && location.pathname !== '/login' && <Link className="btn text-dark shadow-sm btnBg me-4  fs-5" to="/login" role="button" style={{ padding: 'calc(.3rem + .3vw) calc(.5rem + 1vw)' }}><i className="fa-solid fa-right-to-bracket"></i> &nbsp;Login</Link>}
                            {user && <button className="btn text-light shadow-sm bg-danger me-4 fs-5" onClick={handleClick} style={{ padding: 'calc(.3rem + .3vw) calc(.5rem + .3vw)' }}><i className="fa-solid fa-right-from-bracket me-2"></i> LogOut</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}