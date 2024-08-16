import { usePage } from '@/store/page';
import { forwardRef, useEffect, useImperativeHandle, useState, memo } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
    // 组件id
    componentId: number,
    // 容器class
    containerClassName: string,
    // 相对容器class
    offsetContainerClassName: string
}

export default memo(forwardRef((props: IProps, ref: any) => {

    const { componentId, containerClassName, offsetContainerClassName } = props
    const { width: pageWidth } = usePage()

    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    })

    useImperativeHandle(ref, () => ({
        updatePosition,
    }))

    useEffect(() => {
        updatePosition();
    }, [componentId, pageWidth]);

    const updatePosition = () =>{
        if (!componentId) return;

        const container = document.querySelector(`.${offsetContainerClassName}`);
        if (!container) return;

        const node = document.querySelector(`[data-component-id="${componentId}"]`);

        if (!node) return;

        // 获取节点位置
        const { top, left, width, height } = node.getBoundingClientRect();
        // 获取容器位置
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

        console.log(top - containerTop + container.scrollTop, left - containerLeft);

        // 计算位置
        setPosition({
            top: top - containerTop,
            left: left - containerLeft,
            width,
            height,
        });
    }

    const portalContainer = document.querySelector(`.${containerClassName}`);

    const portalStyle: CSSProperties = {
        position: "absolute",
        left: position.left,
        top: position.top,
        backgroundColor: "rgba(66, 133, 244, 0.2)",
        border: "1px solid rgb(66, 133, 244)",
        pointerEvents: "none",
        width: position.width,
        height: position.height,
        zIndex: 99,
        borderRadius: 4,
        boxSizing: 'border-box',
    }
    return portalContainer ? <div style={portalStyle}/> : null
    // return portalContainer ? createPortal(
    //     <div style={portalStyle}/>,
    //     portalContainer
    // ) : null
}))