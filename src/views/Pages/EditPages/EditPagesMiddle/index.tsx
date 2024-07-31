import { memo, useEffect, useRef, useState } from 'react'
import { EditPagesMiddleStyle } from './style'

import leftArrow from '@/assets/images/leftArrow.svg'
import rightArrow from '@/assets/images/rightArrow.svg'


interface propsType{
  setViewWidth: (width: number) => void
}

export default memo((props: propsType) => {

  const editMiddleContent = useRef<HTMLDivElement>(null)
  const [ rightContentExpand, setRightContentExpand ] = useState(true)
  
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
        <div className='edit-left'></div>
        <div className='edit-middle'>
            <div className='edit-middle-content' ref={editMiddleContent}></div>
        </div>
        <div className='edit-right'>
          <div className='edit-right-dot'>
            <div className='dot' onClick={() => { setRightContentExpand(!rightContentExpand) }}>
              <img src={rightContentExpand ? leftArrow : rightArrow} alt="leftArrow" />
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