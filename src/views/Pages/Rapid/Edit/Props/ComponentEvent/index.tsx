import { memo, useState } from 'react'
import { ComponentEventStyled } from './style'
import { useComponetsStore } from '@/stores/components';
import { useComponentConfigStore } from '@/stores/component-config';
import { Button, Collapse, CollapseProps, Drawer } from 'antd';
import { CaretRightOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ComponentEvent } from '@/materials/interface';
import ServiceLayout from './ServiceLayout';

export default memo(() => {

  const { curComponent, componentActionList, updateComponentEvents } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  const [open, setOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>()
  if (!curComponent) return null;

  const arr1 = curComponent?.events || []
  const arr2 = componentConfig[curComponent.name]?.events || []
  // arr2是内置的事件，arr1是接口获取的，arr1存在的时候将arr2过滤掉

  const filteredArr2 = arr2.filter(item2 => !arr1.some(item1 => item1.name === item2.name))

  const arr = [...arr1, ...filteredArr2]

  const items: CollapseProps['items'] = arr.map(event => {
      return {
          key: event.name,
          label: event.label,
          children: (
            <div className='addAction' onClick={() => {
              setCurEvent(event)
              setOpen(true)
            }}>
              {/* 遗留的问题：思考是否去掉开始和结尾 */}
              {
                event.action?.length > 2 ? (
                  <>
                    <EditOutlined /> 编辑当前服务编排
                  </>
                ) : (
                  <>
                    <PlusOutlined /> 添加服务编排
                  </>
                )
              }
            </div>
          )
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
        destroyOnClose={true}
      >
        <ServiceLayout curEventAction={curEvent?.action}/>
      </Drawer>
    </ComponentEventStyled>
  )
})