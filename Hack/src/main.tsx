import "./fonts.css";
import React from "react";
import ReactDOM from "react-dom/client";
import AppScreen from "./components/screens/AppScreen.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ColorThemeProvider } from "./components/providers/ThemeProvider.tsx";

// For more about routing:
// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppScreen />,
        errorElement: <AppScreen />, // lol
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ColorThemeProvider>
            <RouterProvider router={router} />
        </ColorThemeProvider>
    </React.StrictMode>,
);
