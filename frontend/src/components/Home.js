import React, { useContext } from "react";
import Hero from "./Hero";
import About from "./About";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import '../styles.css'
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const{myStyle}=useContext(ThemeContext)
  return (
    <div>
      <section >
        <Hero />
      </section>
      <section id="about" style={{...myStyle}}>
        <About />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="footer">
        <Footer/>
      </section>
    </div>
  );
};

export default Home;