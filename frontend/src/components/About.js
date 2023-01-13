import React from "react";
import '../styles.css'
import booksharing from "./images/maa.jpeg";
import book from "./images/online.jpeg";
import maa from "./images/booksharing.jpeg"
const About = () => {
    return (
        <div>
            <div className="container bg-light py-3 px-5">
                <div className="row">
                    <div className="col-md-6 " style={{ paddingTop: "6rem" }}>
                        <div >
                            <h3>The community is there to help</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.
                                <br />
                                Lorem Ipsum has{" "}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={booksharing} style={{ width: "100%", maxHeight: "25rem" }} className="bg-light" alt=""/>
                    </div>
                </div>
            </div>
            <div className="container px-5 py-4">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={book}
                            alt=""
                            style={{ width: "100%", paddingLeft: "3rem" }}
                        />
                    </div>
                    <div className="col-md-6 " style={{ paddingTop: "6rem" }}>
                        <div >
                            <h3>A decentralised library for everyone</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-5 py-2">
                <div className="row">
                    <div className="col-md-6" style={{ paddingTop: "6rem" }}>
                        <div className="about-div-3"></div>
                        <h3>Join and help others like you</h3>
                        <p>Create an account and keep sharing resources with other</p>
                    </div>
                    <div className="col-md-6">
                        <img src={maa} alt="" style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;