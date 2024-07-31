import { memo, useEffect, useRef, useState } from 'react'
import { EditPagesMiddleStyle } from './style'

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import componentLibrary from '@/assets/images/svg/componentLibrary.svg'
import dataSource from '@/assets/images/svg/dataSource.svg'
import outlineTree from '@/assets/images/svg/outlineTree.svg'
import sourceCode from '@/assets/images/svg/sourceCode.svg'
import howUse from '@/assets/images/svg/howUse.svg'

const editLeftTop = [
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

interface propsType{
  setViewWidth: (width: number) => void
}

type activeType = 'outlineTree' | 'componentLibrary' | 'dataSource' | 'sourceCode' | null

export default memo((props: propsType) => {

  const editMiddleContent = useRef<HTMLDivElement>(null)
  const [ rightContentExpand, setRightContentExpand ] = useState(true)
  const [ active, setActive ] = useState<activeType>(null)
  
  const { setViewWidth } = props

  useEffect(()=>{

    handleWindowResize()

    window.addEventListener("resize", handleWindowResize)
    return () => {
        window.removeEventListener("resize", handleWindowResize)
    }
  }, [])


  const handleWindowResize = () => {
    setViewWidth(editMiddleContent.current?.offsetWidth || 0)
  }

  return (
    <EditPagesMiddleStyle>
        <div className='edit-left'>
          <div className='edit-left-top'>
            {
              editLeftTop.map(item =>{
                return (
                  <div key={item.key} className='edit-left-top-item edit-left-item'>
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
        <div className='edit-middle'>
          <div className='edit-middle-content' ref={editMiddleContent}>
            render,新开一个组件
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
          <div className='edit-right-content' 
            style={{ width: rightContentExpand ? '300px' : '0' }}
            onTransitionEnd={handleWindowResize}
          ></div>
        </div>
    </EditPagesMiddleStyle>
  )
})