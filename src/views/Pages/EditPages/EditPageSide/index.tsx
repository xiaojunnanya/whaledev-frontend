import { memo } from 'react'
import { EditPageSideStyle } from './style'
import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'
import { CloseOutlined } from '@ant-design/icons'


interface propsType{
  activeObj: any
  affix: any
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
          <CloseOutlined onClick={()=> setActive({})} />
        </div>
      </div>
    </EditPageSideStyle>
  )
})