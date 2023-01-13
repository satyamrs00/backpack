import React, { useState,useEffect,useContext } from 'react'
import AuthContext from "../context/AuthContext";
import useAxios from '../utils/useAxios';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem'
import Modal from 'react-bootstrap/Modal';
import '../App.css'

export default function Product() {
    const navigate=useNavigate()
    const api=useAxios()
    let { user } = useContext(AuthContext);
    // useEffect(() => {
    //     if (!user) {navigate('/login')}
    //     // eslint-disable-next-line
    // }, [])

    const myStyle = {
        backgroundColor: 'white'
    }
    const [data,setData]=useState([])
    const getData=async()=>{
        try{
            let response=await api.get('/products')
            setData(response)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData()
        // eslint-disable-next-line
    },[])

    const handleSearch = (e) => {
        console.log(e.target.value);
    }

    //Modals function
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <>
            {/* Modal */}
            <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)',overflow:'visible'}}> 
                <Modal.Header closeButton style={{height:'3.5rem'}}>
                    <Modal.Title style={{textShadow:'1px 1px grey',color:'#404040'}}>Send request for book</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <Modal.Body style={{padding:'1.5rem'}}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" style={{textShadow:'1px 0px grey'}}>Title of Book</label>
                            <input type="text" className="form-control shadow-sm" id="title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label" style={{textShadow:'1px 0px grey'}}>Author of Book</label>
                            <input type="text" className="form-control shadow-sm" id="author" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="moreinfo" className="form-label" style={{textShadow:'1px 0px grey'}}>Additional information of Book</label>
                            <textarea className="form-control shadow-sm" id="moreinfo" style={{height:'calc(5rem + 3vw)'}}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{width:'calc(4rem + 1vw)',height:'calc(2rem + .2vw)'}}>
                            Close
                        </button>
                        <button className='btn btnBg shadow-sm align-items-center d-flex justify-content-center' onClick={handleClose} style={{width:'calc(4rem + 1vw)',height:'calc(2rem + .2vw)'}}>
                            Submit
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            <div style={{ ...myStyle, margin: 'calc(1rem + 2vw) calc(.1rem + 2vw)', boxShadow: '0 0 15px grey' }}>
                <div className="row justify-content-center">
                    <input type="search" name="search" id="search" className='mb-2 mt-4' style={{ color: '#6a6a6a', width: 'calc(10rem + 30vw)', border: "none", outline: 'none', borderBottom: "2px solid grey", boxShadow: "0 0 5px grey", fontSize: 'calc(1rem + .1vw)', padding: 'calc(.1rem + .2vw) 1rem', fontFamily: 'serif' }} placeholder='Search here' onKeyUp={(e) => { if (e.key === 'Enter') { handleSearch(e) } }} />
                </div>
                <div className="row">
                    {data.map((element, index) => {
                        return <div className="col-sm-3 justify-content-center d-flex" style={{ margin: 'calc(1rem + .5vw) 0' }} key={index}>
                            <ProductItem />
                        </div>
                    })}
                </div>
                <h6 className='mx-4 my-3 pb-3'>Could not find your book above ? <button className="btn btnBg btn-sm shadow-sm" style={{marginTop:'calc(.5rem - .5vw)'}} onClick={handleShow}>Raise a request</button></h6>
            </div>
        </>
    )
}