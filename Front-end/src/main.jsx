import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SocketProvider } from "./socket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>          
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </SocketProvider>        
  </Provider>
);