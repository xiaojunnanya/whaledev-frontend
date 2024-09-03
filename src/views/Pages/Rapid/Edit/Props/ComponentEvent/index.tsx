import { memo, useState } from 'react'
import { ComponentEventStyled } from './style'
import { useComponetsStore } from '@/stores/components';
import { useComponentConfigStore } from '@/stores/component-config';
import { Button, Collapse, CollapseProps, Drawer } from 'antd';
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { ComponentEvent } from '@/materials/interface';
import ServiceLayout from './ServiceLayout';

export default memo(() => {

  const { curComponent, componentActionList, updateComponentEvents } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [open, setOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>()

  if (!curComponent) return null;


  const items: CollapseProps['items'] = (componentConfig[curComponent.name]?.events || []).map(event => {
      return {
          key: event.name,
          label: event.label,
          children: <div className='addAction' onClick={() => {
            setCurEvent(event)
            setOpen(true)
          }}><PlusOutlined /> 添加服务编排</div>
      }
  })

  const save = () => {
    curEvent!.action = componentActionList
    updateComponentEvents(curComponent.id, curEvent)
    setOpen(false)
  }

  return (
    <ComponentEventStyled>
      <Collapse items={items} ghost 
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}/>

      <Drawer
        title="添加服务编排"
        extra={
          <>
            <Button type='primary' style={{marginRight: '16px'}} onClick={save}>保存</Button>
            <Button onClick={()=>setOpen(false)}>取消</Button>
          </>
        }
        placement='top'
        closeIcon={null}
        open={open}
        key='top'
        height='100%'
      >
        <ServiceLayout curEventAction={curEvent?.action}/>
      </Drawer>
    </ComponentEventStyled>
  )
})