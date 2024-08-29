import {
    useEffect,
    useMemo,
    useState,
  } from 'react';
  import { createPortal } from 'react-dom';
  import { Popconfirm, Space } from 'antd';
  import { DeleteOutlined } from '@ant-design/icons';
import { getComponentById } from '@/utils';
import { useComponetsStore } from '@/stores/components';
import { usePage } from '@/stores/page';
  
  interface SelectedMaskProps {
    portalWrapperClassName: string
    containerClassName: string
    componentId: string;
  }
  
  function SelectedMask({ containerClassName, portalWrapperClassName, componentId }: SelectedMaskProps) {
  
    const [position, setPosition] = useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      labelTop: 0,
      labelLeft: 0,
    });
  
    const { components, curComponentId, deleteComponent, setCurComponentId} = useComponetsStore()
    const { width } = usePage()
  
    useEffect(() => {
      updatePosition();
    }, [componentId, components, width]);
  
    function updatePosition() {
      if (!componentId) return;
  
      const container = document.querySelector(`.${containerClassName}`);
      if (!container) return;
  
      const node = document.querySelector(`[data-component-id="${componentId}"]`);
      if (!node) return;
  
      const { top, left, width, height } = node.getBoundingClientRect();
      const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
  
      let labelTop = top - containerTop + container.scrollTop;
      let labelLeft = left - containerLeft + width;
  
      if (labelTop <= 0) {
        labelTop -= -20;
      }
    
      setPosition({
        top: top - containerTop + container.scrollTop,
        left: left - containerLeft + container.scrollTop,
        width,
        height,
        labelTop,
        labelLeft,
      });
    }
  
    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!
    }, []);
  
    const curComponent = useMemo(() => {
      return getComponentById(componentId, components);
    }, [componentId]);
  
    function handleDelete() {
        deleteComponent(curComponentId!)
        setCurComponentId(null)
    }
  
    return createPortal((
      <>
        <div
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            border: "1px dashed blue",
            pointerEvents: "none",
            width: position.width,
            height: position.height,
            zIndex: 12,
            borderRadius: 4,
            boxSizing: 'border-box',
          }}
        />
        <div
            style={{
              position: "absolute",
              left: position.labelLeft,
              top: position.labelTop,
              fontSize: "14px",
              zIndex: 13,
              display: (!position.width || position.width < 10) ? "none" : "inline",
              transform: 'translate(-100%, -100%)',
            }}
          >
            <Space>
              <div
                style={{
                  padding: '0 8px',
                  backgroundColor: 'blue',
                  borderRadius: 4,
                  color: '#fff',
                  cursor: "pointer",
                  whiteSpace: 'nowrap',
                }}
              >
                {curComponent?.desc}
              </div>
              {curComponentId !== '0' && (
                <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                  <Popconfirm
                    title="确认删除？"
                    okText={'确认'}
                    cancelText={'取消'}
                    onConfirm={handleDelete}
                  >
                    <DeleteOutlined style={{ color: '#fff' }}/>
                  </Popconfirm>
                </div>
              )}
            </Space>
          </div>
      </>
    ), el)
  }
  
  export default SelectedMask;