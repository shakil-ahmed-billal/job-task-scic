
import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../layout/MainPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/> ,
    },
])

export default router