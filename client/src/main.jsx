import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './components/Route.jsx'
// import {
//   RouterProvider,
//   createBrowserRouter
// } from "react-router-dom";
// import { routerMap } from './configs/router.js';

// const router = createBrowserRouter(routerMap);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Route />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)
