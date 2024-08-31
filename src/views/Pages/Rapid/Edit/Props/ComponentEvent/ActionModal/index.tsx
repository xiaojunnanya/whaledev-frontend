import { memo } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { ActionModalStyled } from './style'

export default memo(() => {
  return (
    <ActionModalStyled>
      <InfiniteViewer
        className="node-viewer"
        displayHorizontalScroll={false}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.5, 10]}
        useResizeObserver={true}
      >
        <div>faf</div>
      </InfiniteViewer>
    </ActionModalStyled>
  )
})