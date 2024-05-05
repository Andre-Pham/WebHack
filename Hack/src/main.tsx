import "./fonts.css";
import React from "react";
import ReactDOM from "react-dom/client";
import AppScreen from "./components/screens/AppScreen.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ColorThemeProvider } from "./components/providers/ThemeProvider.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragProxyLayer from "./components/custom/DragLayer.tsx";

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
            <DndProvider backend={HTML5Backend}>
                <DragProxyLayer />

                <RouterProvider router={router} />
            </DndProvider>
        </ColorThemeProvider>
    </React.StrictMode>,
);
