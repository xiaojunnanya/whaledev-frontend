import { memo } from 'react'
import { OutlineTreeStyled } from './style'
import { Tree } from 'antd'
import { useComponets } from '@/store/components';
import { DownOutlined } from '@ant-design/icons';

export default memo(() => {

  const { components, setCurComponentId } = useComponets();
  console.log(components)
  const componentSelect = ([selectedKey]: any[]) => {
    setCurComponentId(selectedKey)
  }

  // 遗留的问题：添加page  
  let componentsTree = [
    {
      name: 'Page',
      id: -1,
      children: components
    }
  ]

  return (
    <OutlineTreeStyled>
      {/* <div>Page</div> */}
      <Tree
        fieldNames={{ title: 'name', key: 'id' }}
        treeData={componentsTree as any}
        switcherIcon={<DownOutlined />}
        showLine
        defaultExpandAll
        onSelect={componentSelect}
      />
    </OutlineTreeStyled>
  )
})