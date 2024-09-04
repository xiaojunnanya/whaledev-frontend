import { useLocation, Navigate } from 'react-router-dom'

export default (props: { children: JSX.Element }) =>{
    const { pathname } = useLocation()

    const go = Boolean(
        ( pathname === '/login' ) || ( pathname === '/' ) 
        // ( pathname.includes('/share') ) || 
        // ( pathname.includes('/shareCheck') ) ||
        // ( pathname.includes('/invalidSharing') )
    )

    if( go ){
        return props.children
    }
    if(!localStorage.getItem('token')){
        return <Navigate to='/'></Navigate>
    }else{
        return props.children
    }
}