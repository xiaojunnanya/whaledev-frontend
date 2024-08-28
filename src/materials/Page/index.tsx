import { PageStyled } from './style';
import { CommonComponentProps } from '../interface';
import { useMaterailDrop } from '@/hooks/useMaterialDrop';

const Container = ({ children, id }: CommonComponentProps) => {
  const { drop } = useMaterailDrop(['Button', 'Container'], id);

  return (
    <PageStyled className='whale-page' ref={drop}>
      {children}
    </PageStyled>
  )
}

export default Container;