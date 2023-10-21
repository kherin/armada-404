import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/sidebar";

const Root = () => {
    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Sidebar />
                <div className="ml-[70px] h-screen overflow-hidden">
                    <Outlet />
                </div>
            </ThemeProvider>
        </>
    )
}

export default Root;