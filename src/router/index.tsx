import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home/index.tsx'))
const Login = lazy(() => import('@/views/Login/Login/index.tsx'))

const routes:RouteObject[] = [
    {
        path:'/',
        element: <Home />,
    },
    {
        path:'/login',
        element: <Login />
    }
]

export default routes