import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../interface';
import { useDrag } from 'react-dnd';

const Button = ({type, text, id, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
    type: 'Button',
    item: {
        type: 'Button',
        id: id,
        dragType: 'move'
    }
  });

  return (
    <AntdButton type={type} className='whale-button'
    ref={drag}
    style={styles}
    data-component-id={id}
    >{text}</AntdButton>
  )
}

export default Button;