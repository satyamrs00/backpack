import React from "react";
import Hero from "./Hero";
import About from "./About";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import '../styles.css'

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section id="about">
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