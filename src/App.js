import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Tire from "./Components/Tire/Tire";
import Belt from "./Components/Belt/Belt";
import Pad from "./Components/Pad/Pad";
import Caliper from "./Components/Caliper/Caliper";
import NotFound from "./Components/NotFound/NotFound";
import Layout from "./Components/Layout/Layout";


function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "home", element: <Home></Home> },
        { path: "Car-Inspector-React/", element: <Home></Home> },
        { path: "tire", element: <Tire></Tire> },
        { path: "belt", element: <Belt></Belt> },
        { path: "pad", element: <Pad></Pad> },
        { path: "caliper", element: <Caliper></Caliper> },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
