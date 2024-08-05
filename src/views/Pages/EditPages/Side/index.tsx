import { memo } from 'react'
import { EditPageSideStyle } from './style'
import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'
import { CloseOutlined } from '@ant-design/icons'
import { itemProps } from '../Middle'


interface propsType{
  activeObj: {
    active: itemProps,
    setActive: (item: itemProps) => void
  }
  affix: {
    isAffix: boolean,
    setIsAffix: (isAffix: boolean) => void
  }
}

export default memo((props: propsType) => {

  const { activeObj, affix } = props
  const { active, setActive } = activeObj
  const { isAffix, setIsAffix } = affix

  return (
    <EditPageSideStyle>
      <div className='side-top'>
        <div className='side-top-title'>{active.title}</div>
        <div className='side-top-right'>
          <img src={isAffix ? noaffixImg : affixImg} onClick={() => setIsAffix(!isAffix)} />
          <CloseOutlined onClick={()=> setActive({} as itemProps)} />
        </div>
      </div>
      <div className='side-content'>
        {/* 根据选择进行渲染 */}
        123
      </div>
    </EditPageSideStyle>
  )
})