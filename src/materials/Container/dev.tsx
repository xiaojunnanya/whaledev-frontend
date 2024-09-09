import { ContainerStyled } from './style';
import { CommonComponentProps } from '../interface';
import { useMaterailDrop } from '@/hooks/useMaterialDrop';
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';

const Container = ({ children, id, styles, name }: CommonComponentProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const {canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

  const [_, drag] = useDrag({
    type: name,
    item: {
        type: name,
        dragType: 'move',
        id: id
    }
  });

  useEffect(() => {
      drop(divRef);
      drag(divRef);
  }, []);

  return (
    <ContainerStyled className='whale-container' ref={divRef} data-component-id={id}
      style={{ border: canDrop ? '1px dashed #1890ff' : '1px solid #d9d9d9', ...styles}}
    >
      {children}
    </ContainerStyled>
  )
}

export default Container;