import { Button } from 'antd';
import { createElement, memo, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd';
import { ContentStyle } from './style';
import { useComponets } from '@/store/components';
import Space from '../Side/ComponentLibrary/components/Space';
import { ItemType } from '../type';
import SelectedMask from '@/components/SelectedMask';

// id/name/props/children/group(哪个组)/category(哪个类)
// 在思考有没有加入一个类型：是布局类的还是内容类的

interface Component {
  // 组件唯一标识
  id: number;
  // 组件名称
  name: string;
  // 组件属性
  props: any;
  // 子组件
  children?: Component[];
}

// const components: Component[] = [
//   {
//     id: 1,
//     name: 'Button',
//     props: {
//       type: 'primary',
//       children: '按钮',
//     },
//   },
//   {
//     id: 2,
//     name: 'Space',
//     props: {
//       size: 'large',
//     },
//     children: [
//       {
//         id: 3,
//         name: 'Button',
//         props: {
//           type: 'primary',
//           children: '按钮1',
//           style:{
//             color: 'red'
//           }
//         },
//       }, 
//       {
//         id: 4,
//         name: 'Button',
//         props: {
//           type: 'primary',
//           children: '按钮2',
//         },
//       }
//     ]
//   }
// ]

const ComponentMap: { [key: string]: React.ElementType } = {
  Space, Button,
};


export default memo(() => {

  const { components, setCurComponentId, curComponentId } = useComponets()
  const selectedMaskRef = useRef<any>(null)

  // 组件改变后，重新渲染遮罩
  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current.updatePosition();
    }
  }, [components]);

  useEffect(() => {
    const createMask = (e: any) =>{
      //  获取当前点击的元素
      const path = e.composedPath();
      for (let i = 0; i < path.length; i += 1) {
        const ele = path[i];
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
          const componentId = ele.getAttribute("data-component-id");
          setCurComponentId(componentId);
          return;
        }
      }
    }

    let container = document.querySelector(".whale-page");

    if (container) {
      container.addEventListener('click', createMask, true);
    }
    return () => {
      container = document.querySelector(".whale-page");
      if (container) {
        container.removeEventListener("click", createMask, true);
      }
    }
  }, []);

  // 渲染组件
  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {

      if (!ComponentMap[component.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return createElement(
          ComponentMap[component.name], 
          {
            ...component.props,
            "data-component-id": component.id,
            id: component.id,
            key: component.id
          }, 
          component.props.children || renderComponents(component.children || [])
        )
      }

    })
  }

  const [ _ , drop ] = useDrop(()=>({
    accept: [
      ItemType.Button,
      ItemType.Space
    ],
    drop: (_, monitor) => {
      // 目前未知干啥的
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return;
      }

      return {
        id: 0,
      }
    },
    collect: (monitor) => ({
      // 如果拖拽的组件是可以放置的，canDrop则为true
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    // <ContentStyle ref={drop} style={{ backgroundColor: canDrop ? '#00BFFF' : '#fff' }}>
    <ContentStyle ref={drop} className='whale-page'>
      {renderComponents(components)}
      {curComponentId && (
        <SelectedMask
          componentId={curComponentId}
          containerClassName='select-mask-container'
          offsetContainerClassName='whale-page'
          ref={selectedMaskRef}
        />
      )}
      <div className="select-mask-container" />
    </ContentStyle>
  )
})