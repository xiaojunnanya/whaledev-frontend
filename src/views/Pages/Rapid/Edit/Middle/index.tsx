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
        // 疑惑：这里的id和name作用是什么？
        return createElement(
            config.component,
            {
                key: component.id,
                id: component.id,
                name: component.name,
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
    <ContentStyle onClick={handleClick} className='edit-area'>
      {renderComponents(components)}

      {
        curComponentId && (
          <SelectedMask
              portalWrapperClassName='portal-wrapper'
              containerClassName='edit-area'
              componentId={curComponentId}
          />
        )
      }
      
      <div className="portal-wrapper"></div>
    </ContentStyle>
  )
})