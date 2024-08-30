import { ContainerStyled } from './style';
import { CommonComponentProps } from '../interface';

const Container = ({ children, styles, ...props }: CommonComponentProps) => {


  return (
    <ContainerStyled className='whale-container'
      style={styles}
      {...props}
    >
      {children}
    </ContainerStyled>
  )
}

export default Container;