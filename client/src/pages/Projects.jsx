import React from "react";
import SectionTitle from "../components/common/SectionTitle";
import projects from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";

const Projects = () => {
  return (
    <div>
      <SectionTitle
        title={
          <>
            My <span className="text-brand italic">Projects</span>
          </>
        }
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-4">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
