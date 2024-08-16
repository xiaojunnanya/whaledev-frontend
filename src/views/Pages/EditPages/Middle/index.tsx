import { memo, useEffect, useRef, useState } from 'react'
import { EditPagesMiddleStyle } from './style'

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import componentLibrary from '@/assets/images/svg/componentLibrary.svg'
import dataSource from '@/assets/images/svg/dataSource.svg'
import outlineTree from '@/assets/images/svg/outlineTree.svg'
import sourceCode from '@/assets/images/svg/sourceCode.svg'
import howUse from '@/assets/images/svg/howUse.svg'
import EditPageSide from '../Side'
import EditPageContent from '../Content'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePage } from '@/store/page'


type activeType = 'outlineTree' | 'componentLibrary' | 'dataSource' | 'sourceCode' | null
export interface itemProps{
  key: activeType
  title: string
  icon: JSX.Element
}

const editLeftTop: itemProps[] = [
  {
    key:'outlineTree',
    title: '大纲树',
    icon: <img src={outlineTree} alt='outlineTree' />
  },
  {
    key:'componentLibrary',
    title: '组件库',
    icon:<img src={componentLibrary} alt='componentLibrary' />
  },
  {
    key:'dataSource',
    title: '数据源',
    icon:<img src={dataSource} alt='dataSource' />
  },
  {
    key:'sourceCode',
    title: '源码',
    icon:<img src={sourceCode} alt='sourceCode' />
  }
]

const editLeftBottom = [
  {
    key:'howUse',
    title: '如何使用',
    icon: <img src={howUse} alt='howUse' />
  }
]


export default memo(() => {
  const  { setWidth } = usePage()
  const editMiddleContent = useRef<HTMLDivElement>(null)
  const [ rightContentExpand, setRightContentExpand ] = useState(true)
  const [ active, setActive ] = useState<itemProps>({} as itemProps)
  // 是否固定
  const [ isAffix, setIsAffix ] = useState(false)


  useEffect(()=>{

    handleWindowResize()

    window.addEventListener("resize", handleWindowResize)
    return () => {
        window.removeEventListener("resize", handleWindowResize)
    }
  }, [isAffix, active])


  const handleWindowResize = () => {
    setWidth(editMiddleContent.current?.offsetWidth || 0)
  }

  return (
    <EditPagesMiddleStyle>
      <DndProvider backend={HTML5Backend}>
        <div className='edit-left'>
          <div className='edit-left-top'>
            {
              editLeftTop.map(item =>{
                return (
                  <div key={item.key} className={`edit-left-top-item edit-left-item ${active.key === item.key ? 'edit-left-active' : ''}`} 
                  onClick={() => setActive(item.key === active.key ? {} as itemProps : item)}>
                    {
                      item.icon
                    }
                    <span>{item.title}</span>
                  </div>
                )
              })
            }
          </div>
          <div className='edit-left-bottom'>
            {
              editLeftBottom.map(item =>{
                return (
                  <div key={item.key} className='edit-left-bottom-item edit-left-item'>
                    {
                      item.icon
                    }
                    <span>{item.title}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        
        <div className={`edit-side ${active.key ? 'edit-side-active' : ''}`} 
        style={{ position: isAffix ? 'static' : 'absolute'}}>
          <EditPageSide activeObj={{active, setActive}} affix={{ isAffix, setIsAffix}} />
        </div>

        <div className='edit-middle'>
          <div className='edit-middle-content' ref={editMiddleContent}>
            <EditPageContent />
          </div>
        </div>
        <div className='edit-right'>
          <div className='edit-right-dot'>
            <div className='dot' onClick={() => { setRightContentExpand(!rightContentExpand) }}>
              {
                rightContentExpand ? <CaretRightOutlined style={{fontSize:'9px'}}/> : <CaretLeftOutlined style={{fontSize:'9px'}}/>
              }
            </div>
          </div>
          {/* 遗留的问题：收起的时候会有滚动条，内容发生变化 */}
          <div className='edit-right-content' 
            style={{ width: rightContentExpand ? '300px' : '0' }}
            onTransitionEnd={handleWindowResize}
          >
            新开组件新开组件新开组件新开组件新开组件新开组件
          </div>
        </div>
      </DndProvider>
    </EditPagesMiddleStyle>
  )
})