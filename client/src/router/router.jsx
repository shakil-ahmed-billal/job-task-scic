
import Auth from '@/auth/Auth'
import Login from '@/auth/login/Login'
import Register from '@/auth/register.jsx/Register'
import Home from '@/pages/home/Home'
import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../layout/MainPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },

        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            }
        ]
    }
])

export default router