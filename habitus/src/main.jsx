import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./routes/home"
import Home from "./routes/home";
import Sobre from "./routes/sobre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
   
  },
  {
    path: "/",
    element: <Sobre />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
