import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./routes/Login";
import reportWebVitals from "./reportWebVitals";

//configuring router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupCard from "./components/Login/Signup";
import Charts from "./components/Charts";
import { Search } from "./components/Search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignupCard />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/chart",
    element: <Charts />,
  },
  {
    path: "/search",
    element: <Search />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
