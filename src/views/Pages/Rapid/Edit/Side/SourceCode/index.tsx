import { useComponetsStore } from '@/stores/components'
import { memo } from 'react'
import { SourceCodeStyled } from './style'
import Editor, { loader } from '@monaco-editor/react'

export default memo(() => {
  const { components } = useComponetsStore()

  // 遗留的问题：CDN
  // loader.config({
  //   paths: {
  //     vs: 'http://netdisk.kbws.xyz/image',
  //   },
  // });

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