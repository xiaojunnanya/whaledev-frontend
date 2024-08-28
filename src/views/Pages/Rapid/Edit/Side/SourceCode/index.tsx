import { useComponetsStore } from '@/stores/components'
import { memo } from 'react'
import { SourceCodeStyled } from './style'

export default memo(() => {
  const { components } = useComponetsStore()
  return (
    <SourceCodeStyled>
      <pre>
        {JSON.stringify(components, null, 2)}
      </pre> 
    </SourceCodeStyled>
  )
})