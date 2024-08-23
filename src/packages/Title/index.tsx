import { FC, memo } from 'react'

interface Props {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: string;
}

const Title: FC<Props> = memo(({ id }) => {
  console.log(id, 'idid')
  return (
    <div data-component-id={id}>123</div>
  )
})

export default Title