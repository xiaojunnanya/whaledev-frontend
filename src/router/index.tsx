import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('../views/Home/index.tsx'))

const routes:RouteObject[] = [
    {
        path:'/',
        element: <Home />,
    },
]

export default routes