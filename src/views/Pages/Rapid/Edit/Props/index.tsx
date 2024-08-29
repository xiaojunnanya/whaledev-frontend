import { memo, useState } from 'react'
import { PropsEventStyled } from './style'
import { useComponetsStore } from '@/stores/components';
import { Segmented } from 'antd';
import ComponentAttr from './ComponentAttr';
import ComponentStyle from './ComponentStyle';
import ComponentEvent from './ComponentEvent';
import '@/assets/css/scrollbar.css'
// 待添加的功能：渲染待定，根据有没有来渲染
export default memo(() => {

  const { curComponentId } = useComponetsStore();

  const [key, setKey] = useState<string>('属性');

  if (!curComponentId) return (
    <PropsEventStyled className='whale-props-noselect'>请在左侧画布选择节点</PropsEventStyled>
  );

  return (
    <PropsEventStyled>
      <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
      <div className='whale-props-content'>
          {
              key === '属性' && <ComponentAttr />
          }
          {
              key === '样式' && <ComponentStyle />
          }
          {
              key === '事件' && <ComponentEvent />
          }
      </div>
    </PropsEventStyled>
  )
})