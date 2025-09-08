import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { Home } from "./page/home";
import { Compare } from "./page/compare";
import { useSelector } from "react-redux";

function App() {
    const comparePage = useSelector((state: any) => state.compareState.value);
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>
                    <AppSidebar />
                    {!comparePage ? <Home /> : <Compare />}
                </SidebarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
