import React, { useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthContext";
import ProductContext from '../context/ProductContext';
import useAxios from '../utils/useAxios';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem'
import Modal from 'react-bootstrap/Modal';
import '../App.css'

export default function Product() {
    const navigate = useNavigate()
    // const api = useAxios()
    let { user } = useContext(AuthContext);
    let { getallproducts } = useContext(ProductContext)
    // useEffect(() => {
    //     if (!user) {navigate('/login')}
    //     // eslint-disable-next-line
    // }, [])

    const myStyle = {
        backgroundColor: 'white'
    }
    const [data, setData] = useState([])

    //search feature
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        setData(getallproducts(searchQuery))
        // eslint-disable-next-line
    }, [searchQuery])

    const handleClear = (e) => {
        const inputele = e.target.parentElement.parentElement.previousElementSibling
        inputele.value = ''
        setSearchQuery('')
    }

    //Modals function
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Modal */}
            <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible' }}>
                <Modal.Header closeButton style={{ height: '3.5rem' }}>
                    <Modal.Title style={{ textShadow: '1px 1px grey', color: '#404040' }}>Send request for book</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <Modal.Body style={{ padding: '1.5rem' }}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" style={{ textShadow: '1px 0px grey' }}>Title of Book</label>
                            <input type="text" className="form-control shadow-sm" id="title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label" style={{ textShadow: '1px 0px grey' }}>Author of Book</label>
                            <input type="text" className="form-control shadow-sm" id="author" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moreinfo" className="form-label" style={{ textShadow: '1px 0px grey' }}>Additional information of Book</label>
                            <textarea className="form-control shadow-sm" id="moreinfo" style={{ height: 'calc(5rem + 3vw)' }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{ width: 'calc(4rem + 1vw)', height: 'calc(2rem + .2vw)' }}>
                            Close
                        </button>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{ width: 'calc(4rem + 1vw)', height: 'calc(2rem + .2vw)' }}>
                            Submit
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
            {/* onKeyUp={(e) => { if (e.key === 'Enter') { handleSearch() } }} */}
            <div style={{ ...myStyle, margin: 'calc(1rem + 2vw) calc(.1rem + 2vw)', boxShadow: '0 0 15px grey' }}>
                <div className="d-flex justify-content-center">
                    <div style={{ width: 'calc(10rem + 30vw)', position: 'relative' }}>
                        <input type="text" name="search" id="search" className='mb-2 mt-4' style={{borderRadius:'20px', color: '#6a6a6a', width: '100%', border: "none", outline: 'none', borderBottom: "2px solid grey", boxShadow: "0 0 5px grey", fontSize: 'calc(1rem + .1vw)', padding: '.4rem 1.2rem', fontFamily: 'serif' }} placeholder='Search here' onChange={(e) => { setSearchQuery(e.target.value)}} />
                        <span style={{ position: "absolute", right: '.2vw', top: 'calc(1.4rem + .1vw)' }}><button className='btn shadow-none' onClick={handleClear} title='clear'><i className="fa-solid fa-xmark fa-lg"></i></button></span>
                    </div>
                </div>
                <div className="row">
                    {/* <p className='mx-4'>search results for </p> */}
                    {data.map((element, index) => {
                        return <div className="col-md-3 justify-content-center d-flex" style={{ margin: 'calc(1rem + .5vw) 0' }} key={index}>
                            <ProductItem item={element} />
                        </div>
                    })}
                </div>
                <h6 className='mx-4 my-3 pb-3'>Could not find your book above ? <button className="btn btnBg btn-sm shadow-sm" style={{ marginTop: 'calc(.5rem - .5vw)' }} onClick={handleShow}>Raise a request</button></h6>
            </div>
        </>
    )
}