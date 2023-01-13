import React from "react";
import booksharing from "./images/booksharing.jpeg";
const Testimonials = () => {
  return (
    <div className="container">
    <div
      id="carouselExampleIndicators"
      className="carousel slide position-relative"
      data-bs-ride="true"
      style={{marginTop:"10rem"}}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active mt-5"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          className="mt-5"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          className="mt-5"
        ></button>
      </div>
      <div className="carousel-inner" style={{backgroundColor : "rgb(5 182 195 / 62%)"}}>
        <div className="carousel-item active">
          <div className="text-center">
            <img src={booksharing} alt="" className="mt-5" style={{borderRadius:"50%" , width:"20%"}}  />
            <p className="fs-3 mt-5 px-5">I can't thank Backpack enough . They provided me books when I needed them the most that too free .
            It also helped me to make new connections with the persons pursuing same courses and increased my connections
          </p>
          </div>
        </div>
        <div className="carousel-item">
         <div className="text-center">
          <img src={booksharing} alt="" className="mt-5" style={{borderRadius:"50%" , width:"20%"}}  />
          <p className="fs-3 mt-5 px-5">I can't thank Backpack enough . They provided me books when I needed them the most that too free .
            It also helped me to make new connections with the persons pursuing same courses and increased my connections
          </p>
         </div>
        </div>
        <div className="carousel-item">
          <div className="text-center">
          <img src={booksharing} alt="" className="mt-5" style={{borderRadius:"50%", width:"20%"}}   />
          <p className="fs-3 mt-5 px-5">I can't thank Backpack enough . They provided me books when I needed them the most that too free .
            It also helped me to make new connections with the persons pursuing same courses and increased my connections
          </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
     </div>
  );
};

export default Testimonials;