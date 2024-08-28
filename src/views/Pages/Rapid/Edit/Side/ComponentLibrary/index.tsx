import { memo, useMemo } from 'react'
import { ComponentLibraryStyled } from './style'
import { useComponentConfigStore } from '@/stores/component-config'
import { MaterialItem } from '@/components/MaterialItem'

export default memo(() => {

  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig])

  return (
    <ComponentLibraryStyled>
      {
        components.map((item, index) => {
          return (
            <MaterialItem key={item.name + index} name={item.name}></MaterialItem>
          )
        })
      }
    </ComponentLibraryStyled>
  )
})