import React, { useContext,useState,useEffect } from "react";
import Lottie from "./Lottie";
import '../styles.css'
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Hero = () => {
    const {theme}=useContext(ThemeContext)
    const {user}=useContext(AuthContext)
    const [myStyle, setMyStyle] = useState({ background: 'rgb(5 182 195)',color:'black' })
    useEffect(() => {
      if (theme === 'dark') { setMyStyle({ background: '#050505',color:'rgb(245 245 245)' }) }
      else { setMyStyle({ background: 'rgb(5 182 195)',color:"black" }) }
    }, [theme])

    return (
        <div style={{ height: `${window.screen.availHeight}px`,...myStyle }} className="container-fluid hero-container">
            <div className="row w-100">
                <div style={{ transform: "translateY(-3vw)" }} className="col-md-6 justify-content-center align-items-center d-flex">
                    <div className="hero-text-div">
                        <p className="fs-1 fw-bolder" style={{letterSpacing:'-2px',lineHeight:'calc(2.5rem + .5vw)',fontFamily:'Roboto Mono, monospace'}}>
                            You are not alone <br />
                            You have peers...
                        </p>
                        <p className="ms-1 opacity-75 fw-bold"> Lorem Ipsum has been the industry's standard dummy <br />text ever since the 1500s, when an unknown printer took <br />a galle
                        </p>
                        <Link className={`btn btn-outline-${theme==='light'?'dark':"light"} btn-lg mt-3 text-center shadow-none`} to={!user?'/register':'/lendbook'}>{!user?'Get Started':'Help Others'}</Link>
                    </div>
                </div>
                <div className="col-md-6 text-center lottie-col">
                    <Lottie />
                </div>
            </div>
        </div>
    );
};

export default Hero;