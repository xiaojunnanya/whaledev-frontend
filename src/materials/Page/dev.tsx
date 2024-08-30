import { PageStyled } from './style';
import { CommonComponentProps } from '../interface';
import { useMaterailDrop } from '@/hooks/useMaterialDrop';

const Container = ({ children, id, styles }: CommonComponentProps) => {
  const { drop } = useMaterailDrop(['Button', 'Container'], id);

  return (
    <PageStyled className='whale-page' ref={drop} data-component-id={id} style={styles}>
      {children}
    </PageStyled>
  )
}

export default Container;