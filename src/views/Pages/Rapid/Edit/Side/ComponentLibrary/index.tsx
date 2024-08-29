import { memo, useMemo } from 'react'
import { ComponentLibraryStyled } from './style'
import { useComponentConfigStore } from '@/stores/component-config'
import { MaterialItem } from '@/components/MaterialItem'

export default memo(() => {

  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    // 过滤page根
    return Object.values(componentConfig).filter(item => item.name !== 'Page')
  }, [componentConfig])

  return (
    <ComponentLibraryStyled>
      {
        components.map((item, index) => {
          return (
            <MaterialItem key={item.name + index} name={item.name} desc={item.desc}></MaterialItem>
          )
        })
      }
    </ComponentLibraryStyled>
  )
})