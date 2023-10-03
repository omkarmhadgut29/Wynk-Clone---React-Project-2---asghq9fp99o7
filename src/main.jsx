import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <App />
            </Provider>
        </StyledEngineProvider>
    </React.StrictMode>
);
