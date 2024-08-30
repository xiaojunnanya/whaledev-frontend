import MonacoEditor, { OnMount, EditorProps, loader } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { memo } from 'react'
import * as monaco from 'monaco-editor'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'

export interface EditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    value: string
    onChange?: EditorProps['onChange']
    options?: editor.IStandaloneEditorConstructionOptions
}

export default memo((props: Props) => {
    const {
        value,
        onChange,
        options
    } = props;

    // 解决CDN问题
    self.MonacoEnvironment = {
        getWorker() {
        return new cssWorker()
        },
    };

    loader.config({ monaco })

    const handleEditorMount: OnMount = (editor, monaco) => {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
          editor.getAction('editor.action.formatDocument')?.run()
      });
    }

    return <MonacoEditor
        height='100%'
        path='component.css'
        language='css'
        onMount={handleEditorMount}
        onChange={onChange}
        value={value}
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                  enabled: false,
                },
                scrollbar: {
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
                ...options
            }
        }
    />
})