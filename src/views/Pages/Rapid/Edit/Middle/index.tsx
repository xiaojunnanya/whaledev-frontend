import { createElement, memo, MouseEventHandler } from 'react'
import { ContentStyle } from './style'
import { Component, useComponetsStore } from '@/stores/components'
import { useComponentConfigStore } from '@/stores/component-config'
import SelectedMask from '@/components/SelectedMask'

export default memo(() => {

  const { components, setCurComponentId, curComponentId } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
        const config = componentConfig?.[component.name]

        if (!config?.component) {
            return null;
        }
        // 疑惑：添加的id name 为什么不会挂载在组件上
        return createElement(
            config.component,
            {
                key: component.id,
                id: component.id,
                name: component.name,
                styles: component.styles,
                ...config.defaultProps,
                ...component.props,
            },
            renderComponents(component.children || [])
        )
    })
  }

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
        const ele = path[i] as HTMLElement;

        const componentId = ele.dataset?.componentId;
        if (componentId) {
            setCurComponentId(componentId);
            return;
        }
    }
  }

  return (
    <ContentStyle onClick={handleClick} className='whale-edit-area'>

      {
        renderComponents(components)
      }

      {
        curComponentId && (
          <SelectedMask
              portalWrapperClassName='whale-wrapper'
              containerClassName='whale-edit-area'
              componentId={curComponentId}
          />
        )
      }
      
      <div className="whale-wrapper"></div>
    </ContentStyle>
  )
})