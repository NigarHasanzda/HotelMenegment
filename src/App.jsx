
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Pages/Home/Home'
import Login from './components/Login/Login'

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
    }
  ])

  return <RouterProvider router={router} />
}

export default App
