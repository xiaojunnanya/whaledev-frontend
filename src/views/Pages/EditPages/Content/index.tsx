import { Button } from 'antd';
import { createElement, memo, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd';
import { ContentStyle } from './style';
import { Component, useComponets } from '@/store/components';
import Space from '../Side/ComponentLibrary/components/Space';
import { ItemType } from '../type';
import SelectedMask from '@/components/SelectedMask';

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
    // 遗留的问题： data-component-id
    <ContentStyle ref={drop} className='whale-page' data-component-id={'-1'}>
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