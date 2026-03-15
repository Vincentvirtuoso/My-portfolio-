// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Media from "./pages/Media";
import Messages from "./pages/Messages";
import Skills from "./pages/Skills";
import Testimonials from "./pages/Testimonials";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ProjectForm from "./pages/ProjectForm";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import AuthAlert from "./components/common/AuthAlert";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route
                    path="/projects"
                    element={
                      <Projects setSelectedProject={setSelectedProject} />
                    }
                  />
                  <Route
                    path="/project/edit"
                    element={
                      <ProjectForm
                        isEditMode
                        projectId={selectedProject?._id}
                        initialData={selectedProject}
                        redirectTo={`/project/info/${selectedProject?._id}`}
                      />
                    }
                  />
                  <Route
                    path="/project/info/:id"
                    element={
                      <ProjectDetail setSelectedProject={setSelectedProject} />
                    }
                  />
                  <Route path="media" element={<Media />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="skills" element={<Skills />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="project/create" element={<ProjectForm />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AuthAlert />
      <div className="flex flex-1 flex-col overflow-y-auto not-lg:mt-17">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
