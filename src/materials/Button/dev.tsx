import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../interface';

const Button = ({type, text, id, styles}: CommonComponentProps) => {
  return (
    <AntdButton type={type} className='whale-button'
    style={styles}
    data-component-id={id}
    >{text}</AntdButton>
  )
}

export default Button;