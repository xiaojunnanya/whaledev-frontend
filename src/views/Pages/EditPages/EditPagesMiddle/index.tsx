import { memo, useEffect, useRef } from 'react'
import { EditPagesMiddleStyle } from './style'


interface propsType{
  setViewWidth: (width: number) => void
}

export default memo((props: propsType) => {

  const editMiddleContent = useRef<HTMLDivElement>(null)
  
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
        <div className='edit-right'></div>
    </EditPagesMiddleStyle>
  )
})