import { FC, memo } from 'react'
import { Button } from 'antd'

interface Props {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: string;
}

const Buttons: FC<Props> = memo((props) => {
  const { id } = props
  console.log(props, 'props')

  return (
    <Button data-component-id={id}>按钮</Button>
  )
})

export default Buttons