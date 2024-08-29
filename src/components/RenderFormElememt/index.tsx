import { ComponentSetter } from '@/stores/component-config'
import { Input, Select } from 'antd'
import { memo, useMemo } from 'react'

interface IProps{
    setter: ComponentSetter
}

export default memo((props: IProps) => {

  const { setter } = props

  const element = useMemo(()=>{
    const { type, options } = setter

    let ele = null

    switch (type) {
      case 'input':
        ele = <Input />
        break;
      case 'select':
        ele = <Select options={options} />
        break;
      default:
        ele = <div />
        break;
    }

    return ele
  }, [setter])

  return (
    <>
        {element}
    </>
  )
})