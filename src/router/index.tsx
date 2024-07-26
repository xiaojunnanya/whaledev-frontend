import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home/index.tsx'))
const Login = lazy(() => import('@/views/Login/index.tsx'))
const ProjectCollection = lazy(() => import('@/views/ProjectCollection/index.tsx'))
const PreviewPages = lazy(() => import('@/views/Pages/PreviewPages/index'))
const NotFound = lazy(() => import('@/components/NotFound/index'))


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
    },
    {
        path: '/project/:projectId',
        element: <PreviewPages />,
        children: [
            // 使用 `index` 路由来处理根路径
            {
                index: true,
                element: <PreviewPages />,
                // 如果不指定 `element`，则继承父级的 `element`
                // 但是不指定页面会报警告，还是指定为了消除警告
            },
            {
                path: ':config',
                element: <PreviewPages />,
            },
            {
                path: ':config/page',
                element: <PreviewPages />,
            },
            {
                path: ':config/page/:pageId',
                element: <PreviewPages />,
            },
        ],
    },
    {
        path:'*',
        element: <NotFound></NotFound>
    },
]
export default routes