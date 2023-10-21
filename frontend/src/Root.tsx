import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/sidebar";

const Root = () => {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Sidebar />
                <div className="ml-[10px]">
                    <Outlet />
                </div>
            </ThemeProvider>
        </>
    )
}

export default Root;