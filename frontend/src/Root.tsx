import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/sidebar";

// global css
import "./globals.css";

const Root = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Sidebar />
        <div className="ml-[70px] h-screen">
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Root;
