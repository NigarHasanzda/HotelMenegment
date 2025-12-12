
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Pages/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
      ]
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ])

  return(
      <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </>
    )
}

export default App
