import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/sidebar";

const Root = () => {
    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Sidebar />
                <div className="ml-[70px] h-screen max-h-[calc(100vh-10px)] overflow-auto">
                    <Outlet />
                </div>
            </ThemeProvider>
        </>
    )
}

export default Root;