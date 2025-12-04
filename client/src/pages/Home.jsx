import React from "react";
import Hero from "../sections/home/Hero";
import Tools from "../sections/home/Tools";
import Services from "../sections/home/Services";
import FeaturedProjects from "../sections/home/FeaturedProjects";
import CTASection from "../sections/home/CTASection";

const Home = () => {
  const test=window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  return (
    <div className="space-y-14 pt-10 px-4 lg:px-8">
      <p>
        {test.toString()}
      </p>
      <Hero />
      <Services />
      <FeaturedProjects />
      <CTASection />
    </div>
  );
};

export default Home;
