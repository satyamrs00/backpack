import React from "react";
import Lottie from "./Lottie";
const Hero = () => {
    return (
        <div style={{ height: `${window.screen.availHeight}px` }} className="container-fluid hero-container" >
            <div className="row w-100">
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="col-md-6">
                    <div className="hero-text-div">
                        <p className="fs-1 fw-bolder fs-italics hero-msg">
                            You are not alone <br />
                            You have peers...
                        </p>
                        <p className="ms-1 hero-text"> Lorem Ipsum has been the industry's standard dummy <br />text ever since the 1500s, when an unknown printer took <br />a galle
                        </p>
                        <button className="btn btn-outline-dark btn-lg mt-3 text-center  ">Get Started</button>
                    </div>
                </div>
                <div className="col-md-6 text-center lottie-col">
                    <Lottie />
                </div>
            </div>
        </div >
    );
};

export default Hero;