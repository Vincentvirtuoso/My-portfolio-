import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const usePageTitle = (title) => {
  const { setPageTitle } = useAuth();

  useEffect(() => {
    setPageTitle(title);
    return () => setPageTitle("Admin Dashboard");
  }, [title, setPageTitle]);
};
