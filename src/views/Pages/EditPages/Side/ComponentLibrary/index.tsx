import { memo } from 'react'
import { ComponentLibraryStyled } from './style';
import ComponentItem from './ComponentItem';
import { useComponets } from '@/store/components';
import { ItemType } from '../../type';

export default memo(() => {

  const { addComponent } = useComponets()

  const onDragEnd = (dropResult:  { name: string, props: any, id: number }) => {
    // 拖拽结束，添加数据
    addComponent({
      id: new Date().getTime(),
      name: dropResult.name,
      props: dropResult.props,
    }, dropResult.id)
  }

  return (
    <ComponentLibraryStyled>
      <ComponentItem onDragEnd={onDragEnd} description='按钮' name={ItemType.Button} />
      <ComponentItem onDragEnd={onDragEnd} description='间距' name={ItemType.Space} />
    </ComponentLibraryStyled>
  )
})