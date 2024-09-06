import { getPageJsonById } from '@/service/modules/pages'
import { useComponentConfigStore } from '@/stores/component-config'
import { Component } from '@/stores/components'
import { handleActionFlow } from '@/utils'
import { message } from 'antd'
import { createElement, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default memo(() => {
  const params = useParams()
  const { projectId = '', pageId = '' } = params
  const [ pageJson, setPageJson ] = useState<Component[]>([] as Component[])

  useEffect(()=>{
    getPageJson()
  }, [])

  const getPageJson = async () => {
    // 获取页面信息
    const { data } =  await getPageJsonById(projectId, pageId)
    if(data?.data?.pageJson){
      setPageJson(JSON.parse(data.data.pageJson))
    }
}

  const { componentConfig } = useComponentConfigStore()

  function handleEvent(component: Component) {
    const props: Record<string, any> = {};

    component?.events?.forEach((events) => {

      props[events.name] = (params: any) => {
        handleActionFlow(events.action, params);
      }
        
        // const eventConfig = component.props[event.name];
        // if (eventConfig) {
        //     const { type } = eventConfig;

        //     props[event.name] = () => {
        //       if (type === 'goToLink' && eventConfig.url) {
        //           window.location.href = eventConfig.url;
        //       } else if (type === 'showMessage' && eventConfig.config) {
        //           if (eventConfig.config.type === 'success') {
        //               message.success(eventConfig.config.text);
        //           } else if (eventConfig.config.type === 'error') {
        //               message.error(eventConfig.config.text);
        //           }
        //       }
        //   }
        // }
    })
    return props;
  }

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
        const config = componentConfig?.[component.name]

        if (!config?.component.prod) {
            return null;
        }
        // 疑惑：添加的id name 为什么不会挂载在组件上
        return createElement(
            config.component.prod,
            {
                key: component.id,
                id: component.id,
                name: component.name,
                styles: component.styles,
                ...config.defaultProps,
                ...component.props,
                ...handleEvent(component)
            },
            renderComponents(component.children || [])
        )
    })
  }

  return (
    <div>
      {
        renderComponents(pageJson)
      }
    </div>
  )
})