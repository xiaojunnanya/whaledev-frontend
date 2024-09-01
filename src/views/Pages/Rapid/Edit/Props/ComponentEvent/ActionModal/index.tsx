import { memo, useEffect, useRef } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { ActionModalStyled } from './style'

import { Graph, Node } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import { Dropdown } from 'antd'

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-react-node',
      x: 40,
      y: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'custom-react-node',
      x: 160,
      y: 180,
      label: 'world',
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
}

export default memo(() => {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const graph = new Graph({
      container: ref.current || undefined,
      background: {
        color: '#F2F7FA',
      },
    })

    graph.fromJSON(data)
    graph.centerContent()
  }, [])

  return (
    <ActionModalStyled>
      {/* <InfiniteViewer
        className="node-viewer"
        displayHorizontalScroll={false}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.5, 10]}
        useResizeObserver={true}
      > */}
        <div className="react-shape-app">
          <div className="app-content" ref={ref} />
        </div>
      {/* </InfiniteViewer> */}
    </ActionModalStyled>
  )
})


const CustomComponent = ({ node }: { node: Node }) => {
  const label = node.prop('label')
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'copy',
            label: '复制',
          },
          {
            key: 'paste',
            label: '粘贴',
          },
          {
            key: 'delete',
            label: '删除',
          },
        ],
      }}
      trigger={['contextMenu']}
    >
      <div className="custom-react-node">{label}</div>
    </Dropdown>
  )
}

register({
  shape: 'custom-react-node',
  width: 100,
  height: 40,
  component: CustomComponent,
})