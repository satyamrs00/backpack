import React, { useContext, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Carousel from './Carousel'
import available from './images/available.png'
import notavailable from './images/notavailable.png'
import AuthContext from "../context/AuthContext";
import ThemeContext from '../context/ThemeContext'
import Loading from './Loading'
import useAxios from "../utils/useAxios";
import { baseurl } from '../baseurl'

export default function ProductDetails() {
    const api = useAxios()
    const {theme,myStyle} = useContext(ThemeContext)
    const { checkUser, loading } = useContext(AuthContext)
    // eslint-disable-next-line
    useEffect(() => { checkUser() }, [])
    const capitalize = (str) => {
        return (str[0].toUpperCase() + str.slice(1))
    }

    const location = useLocation()
    const data = location.state.object
    const imageArr = []
    if (data.photo1) { imageArr.push(data.photo1) }
    if (data.photo2) { imageArr.push(data.photo2) }
    if (data.photo3) { imageArr.push(data.photo3) }
    if (data.photo4) { imageArr.push(data.photo4) }
    if (data.photo5) { imageArr.push(data.photo5) }
    const formData = new FormData()
    const handleClick = async (e) => {
        e.target.innerText = 'Requested'
        e.target.disabled = 'true'
        formData.append('product', data.id)
        let url = baseurl + 'api/request-product/'
        await api.post(url, formData)
    }

    const [myStyle2, setMyStyle2] = useState({
        background: 'rgb(240 240 240)',
        color: '#181818',
    })
    useEffect(() => {
        if (theme === 'dark') {
            setMyStyle2({
                background: '#252525',
                color: 'white'
            })
        }
        else {
            setMyStyle2({
                background: 'rgb(240 240 240)',
                color: 'black'
            })
        }
    }, [theme])

    return (
        <>
            {loading && <Loading />}
            {!loading &&
                <div style={{ ...myStyle, boxShadow: '0 0 10px grey', padding: '1.5rem', border: "4px outset lightgrey" }} className='container rounded-3'>
                    <div className="row">
                        <div className={`col-${window.screen.width > 900 ? 6 : 12} d-flex justify-content-center rounded`} style={{marginBottom:"calc(1.5rem - 1.5vw)"}}>
                            <Carousel images={imageArr} width='calc(10rem + 25vw)' height='calc(12rem + 23vw)' />
                        </div>
                        <div style={{ fontFamily: 'Roboto Slab', position: "relative",...myStyle2 }} className={`col-${window.screen.width > 900 ? 6 : 12}`}>
                            <div className='row' style={{ padding: '1rem 1.5rem .1rem 1.5rem'}}>
                                <h5 className='col' style={{ fontSize: 'calc(1.7rem + .3vw)' }}>{capitalize(data.name)}</h5>
                                <img className='col-2' src={data.available ? available : notavailable} alt={data.available ? 'available' : 'not available'} style={{ width: 'calc(3.5rem + .5vw)', height: "calc(2rem + .5vw)" }} />
                            </div>
                            <div style={{ padding: '1.5rem 1.5rem .5rem 1.5rem' }}>
                                <h6 style={{ fontSize: 'calc(1rem + .1vw)', letterSpacing: '.5px' }}>About this book</h6>
                                <p style={{ fontSize: 'calc(.9rem + .2vw)',fontWeight:"600",wordBreak:'break-all' }}>{data.description}</p>
                            </div>
                            <div style={{ padding: '0rem 1.5rem .5rem 1.5rem' }}>
                                <h6 style={{ fontSize: 'calc(1rem + .1vw)', letterSpacing: '.5px' }}>Owner Details</h6>
                                Name : <span style={{ fontSize: 'calc(1rem + .1vw)', fontWeight: '600' }}>{capitalize(data.owner.first_name) + " " + capitalize(data.owner.last_name)}</span>
                                <br />
                                Batch : <span style={{ fontSize: 'calc(1rem + .1vw)', fontWeight: '600' }}>{data.owner.batch}</span>
                                <br /><br />
                                <h6 style={{ fontSize: 'calc(1rem + .1vw)', letterSpacing: '.5px' }}>Current Owner Details</h6>
                                Name : <span style={{ fontSize: 'calc(1rem + .1vw)', fontWeight: '600' }}>{capitalize(data.current_owner.first_name) + " " + capitalize(data.current_owner.last_name)}</span>
                                <br /> 
                                Batch : <span style={{ fontSize: 'calc(1rem + .1vw)', fontWeight: '600' }}>{data.current_owner.batch}</span>
                            </div>
                            <div className={`${window.screen.width>992?'position-absolute':''} bottom-0`} style={{ width: '97%' }}>
                                <div className="footer d-flex justify-content-end" style={{ backgroundColor: 'rgb(187 187 187)', padding: '.5rem 1rem',marginBottom:".5rem" }}>
                                    {data.available && <button className='btn shadow-sm' style={{ backgroundColor: "orange", fontWeight: '600', color: '#404040' }} onClick={handleClick}>Request Book</button>}
                                    {!data.available && <span className='text-danger p-1'>Currently unavailable</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
