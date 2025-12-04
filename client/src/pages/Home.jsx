import React from "react";
import Hero from "../sections/home/Hero";
import Tools from "../sections/home/Tools";
import Services from "../sections/home/Services";
import FeaturedProjects from "../sections/home/FeaturedProjects";
import CTASection from "../sections/home/CTASection";

const Home = () => {
  return (
    <div className="space-y-14 pt-10 px-4 lg:px-8">
      <Hero />
      <Services />
      <FeaturedProjects />
      <CTASection />
    </div>
  );
};

export default Home;
