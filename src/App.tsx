import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { Provider } from "react-redux";
import store from "./store";
import { Home } from "./page/home";
import { Compare } from "./page/compare";

function App() {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <SidebarProvider>
                        <AppSidebar />
                        <Home />
                        <Compare />
                    </SidebarProvider>
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
