import { createElement, memo } from 'react'
import { ContentStyle } from './style'
import { Component, useComponetsStore } from '@/stores/components'
import { useComponentConfigStore } from '@/stores/component-config'

export default memo(() => {

  const { components } = useComponetsStore()
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

  return (
    <ContentStyle>
      {/* <pre>
      {JSON.stringify(components, null, 2)}
      </pre> */}
      {renderComponents(components)}
    </ContentStyle>
  )
})