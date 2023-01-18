import React from "react";
import booksharing from "./images/maa2.png";
import book from "./images/online.png";
import maa from "./images/maa3.png"

const About = () => {
  return (
    <div>
      <div className="container py-4">
        <div className="row py-4 ">
          <div className="col-md-6 align-items-center d-flex" style={{padding:'0 calc(2.5rem)'}}>
            <div >
              <h3>The community is here to <br/>help</h3>
              <p className="mt-4 fs-5 opacity-75">
               Be the part of a sharing community which helps <br/> each other through books
              </p>
            </div>
          </div>
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img src={booksharing} style={{ width: "100%",height:'20rem'}} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-4">
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img
              src={book}
              alt=""
              style={{ width: "100%",height:'20rem'}}
            />
          </div>
          <div className="col-md-6 order-first order-md-last align-items-center d-flex justify-content-end" style={{padding:'0 calc(2.5rem)'}}>
            <div >
            <h3>A decentralised library<br/> for everyone</h3>
            <p className="mt-4 fs-5 opacity-75" >
            Find your favourite books from the ease of your<br/> home without spending any money .<br/><b>!! Yes it is a library...</b>
            </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-4">
        <div className="row py-4 ">
          <div className="col-md-6 align-items-center d-flex"  style={{padding:'0 calc(2.5rem)'}}>
            <div>
            <h3>Join and help others <br/>like you</h3>
            <p className="mt-4 fs-5 opacity-75">Come on and create an account to join <br/>us so you can also serve as a part of this initiative</p>
            </div>
          </div>
          <div className="col-md-6" style={{padding:'0 2.5vw'}}>
            <img src={maa} alt="" style={{width : "100%",height:'20rem'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;