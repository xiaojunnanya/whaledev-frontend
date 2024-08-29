import { useComponetsStore } from '@/stores/components'
import { memo } from 'react'
import { SourceCodeStyled } from './style'
import Editor from '@monaco-editor/react'

export default memo(() => {
  const { components } = useComponetsStore()
  return (
    <SourceCodeStyled>
      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={JSON.stringify(components, null, 2)}
      />
    </SourceCodeStyled>
  )
})