import { PageStyled } from './style';
import { CommonComponentProps } from '../interface';

const Container = ({ children, styles, ...props }: CommonComponentProps) => {

  return (
    <PageStyled className='whale-page' style={styles} {...props}>
      {children}
    </PageStyled>
  )
}

export default Container;