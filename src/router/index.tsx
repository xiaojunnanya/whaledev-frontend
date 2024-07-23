import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home/index.tsx'))
const Login = lazy(() => import('@/views/Login/index.tsx'))
const ProjectCollection = lazy(() => import('@/views/ProjectCollection/index.tsx'))


const routes:RouteObject[] = [
    {
        path:'/',
        element: <Home />,
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/project',
        element: <ProjectCollection />
    }
]

export default routes