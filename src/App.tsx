import { memo, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import { message } from 'antd'
import { useAppSelector, useAppShallowEqual } from './store'

const App = memo(() => {
  const [ messageApi, contextHolder ] = message.useMessage()

  const { mess } = useAppSelector((state)=>{
    return {
      mess: state.global.globalMessage
    }
  }, useAppShallowEqual)

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
        contextHolder
      }
      {
        useRoutes(routes)
      }
    </>
  )
})

export default App