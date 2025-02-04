import { memo, useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from './router'
import { ConfigProvider, message, notification } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import Header from './components/Header'
import Footer from './components/Footer'
import { useGlobal } from './stores/global';

const App = memo(() => {
  const [ messageApi, msgContextHolder ] = message.useMessage()
  const [ errorApi, errContextHolder ] = notification.useNotification()
  const { message: globalMessage } = useGlobal()
  const { pathname } = useLocation()
  const [ showHeader, setShowHeader ] = useState<boolean>(true)

  useEffect(()=>{
    // 不加这个在存在弹窗的时候路由跳转重新弹出弹窗
    messageApi.destroy()

    if(pathname === '/login'){
      setShowHeader(false)
    }else{
      setShowHeader(true)
    }
  }, [pathname])
  

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

    const { type, text } = globalMessage
    if(type){
      switch (type) {
        case 'success': messageApi.success(text);break;
        case 'error': messageApi.error(text);break;
        case 'warning': messageApi.warning(text);break;
        case 'info': messageApi.info(text);break;
      
        default: messageApi.destroy();break;
      }
    }
  }, [globalMessage])

  // 捕获错误：系统+网络(在封装的axios中通过promise.reject抛出)
  const catchErr = (e: any) =>{
    // https://juejin.cn/post/7416282129451810867#heading-4

    // const target = e.target
    // if (!target || (target && !target?.localName)) { 
    //   console.log(' JS运行错误')
    // }

    // if(target?.localName){ 
    //   console.log('资源加载错误')
    // }

    
    let notificationMessage = {
      message: 'Error',
      description:'Unknown error',
      duration: 3,
      error: e
    }

    if(e.reason){
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