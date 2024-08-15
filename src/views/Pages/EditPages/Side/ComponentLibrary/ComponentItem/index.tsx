// src/editor/common/component-item.tsx
import { useDrag } from 'react-dnd';
import { ItemType } from '../../../Content';
import { ComponentItemStyled } from './style';

interface ComponentItemProps {
  // 组件名称
  name: string,
  // 组件描述
  description: string,
  // 拖拽结束回调
  onDragEnd: any,
}

const ComponentItem: React.FC<ComponentItemProps> = ({ name, description, onDragEnd }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      // getDropResult：获取到useDrop中drop的返回结果
      const dropResult = monitor.getDropResult();

      if (!dropResult) return;

      onDragEnd && onDragEnd({
        name,
        props: name === ItemType.Button ? { children: '按钮' } : {},
        ...dropResult,
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <ComponentItemStyled
      ref={drag}
      style={{
        opacity
      }}
    >
      {description}
    </ComponentItemStyled>
  )
}

export default ComponentItem;
