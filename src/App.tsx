import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [csvData, setCsvData] = useState(); // State to hold CSV data\
  const csvDataPageCallback = (data: any) => {
    setCsvData(data);
    console.log("CSV Data in Home:", data);
  };

  return (
    <>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider>
            <AppSidebar csvDataPageCallback={csvDataPageCallback} />
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
