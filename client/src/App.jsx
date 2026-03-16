import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import MaintenanceScreen from "./components/common/MaintenanceScreen";
import { useSettings } from "./context/SettingsContext";
import Spinner from "./components/loaders/Spinner";

const App = () => {
  const { settings, loading, error } = useSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">
            Unable to load application settings. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand text-primary-foreground rounded-lg hover:bg-brand-dark transition-colors duration-200 font-medium"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (settings?.maintenanceMode) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      {<Navbar />}
      <ScrollToTop />
      <main
        className={
          "min-h-screen bg-background transition-colors duration-300 pt-16"
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
