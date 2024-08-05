import { memo } from 'react'
import { EditPageSideStyle } from './style'
import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'
import { CloseOutlined } from '@ant-design/icons'
import { itemProps } from '../Middle'
import OutlineTree from './OutlineTree'
import ComponentLibrary from './ComponentLibrary'
import DataSource from './DataSource'
import SourceCode from './SourceCode'


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

  let ShowDom = null

  switch (active.key) {
    case 'outlineTree': ShowDom = <OutlineTree />; break;
    case 'componentLibrary': ShowDom = <ComponentLibrary />; break;
    case 'dataSource': ShowDom = <DataSource />; break;
    case 'sourceCode': ShowDom = <SourceCode />; break;
    default: break;
  }

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
        {
          ShowDom
        }
      </div>
    </EditPageSideStyle>
  )
})