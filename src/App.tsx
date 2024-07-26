import { memo, useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from './router'
import { ConfigProvider, message, notification } from 'antd'
import { useAppSelector, useAppShallowEqual } from './store'
import zhCN from 'antd/es/locale/zh_CN';
import Header from './components/Header'
import Footer from './components/Footer'

const App = memo(() => {
  const [ messageApi, msgContextHolder ] = message.useMessage()
  const [ errorApi, errContextHolder ] = notification.useNotification()

  const { pathname } = useLocation()
  const [ showHeader, setShowHeader ] = useState<boolean>(true)


  useEffect(()=>{
    if(pathname === '/login'){
      setShowHeader(false)
    }else{
      setShowHeader(true)
    }
  }, [pathname])
  

  const { mess } = useAppSelector((state)=>{
    return {
      mess: state.global.globalMessage
    }
  }, useAppShallowEqual)

  // 捕获错误：系统+网络(通过promise.reject抛出)
  const catchErr = (e: any) =>{

    let notificationMessage = {
      message: 'Error',
      description:'Unknown error',
      duration: 3,
      error: e
    }

    if(e.reason){
      console.log(e.reason);
      const { reason } = e
      // promise.reject抛出
      notificationMessage = {
        ...notificationMessage,
        message: reason.name || '未知错误',
        description: reason.message || '未知错误'
      }
    }else{
      // 系统错误
      notificationMessage = {
        ...notificationMessage,
        description: e.message || '未知错误'
      }
    }
    
    // 除了弹窗提示，也需要上报：采用上传gif
    errorApi.error(notificationMessage)
  }

  useEffect(()=>{
    window.addEventListener('error', catchErr)
    window.addEventListener('unhandledrejection', catchErr)

    return () => {
      window.removeEventListener('error', catchErr)
      window.removeEventListener('unhandledrejection', catchErr)
    }
  }, [])

  useEffect(()=>{
    messageApi.destroy()
    if(mess.type){
      switch (mess.type) {
        case 'success': messageApi.success(mess.message);break;
        case 'error': messageApi.error(mess.message);break;
        case 'warning': messageApi.warning(mess.message);break;
        case 'info': messageApi.info(mess.message);break;
      
        default: messageApi.destroy();break;
      }
    }
  }, [mess])

  return (
    <>
      {
        showHeader && (
          <header>
            <Header></Header>
          </header>
        )
      }
      
      {
        msgContextHolder
      }
      {
        errContextHolder
      }

      
      <ConfigProvider locale={zhCN}>
        {
          useRoutes(routes)
        }
      </ConfigProvider>
      
      
      {
        pathname === '/' && (
          <footer>
            <Footer></Footer>
          </footer>
        )
      }
      
    </>
  )
})

export default App