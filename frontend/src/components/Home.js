import React from "react";
import Hero from "./Hero";
import About from "./About";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;