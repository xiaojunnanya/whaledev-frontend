// src/editor/layouts/setting/event.tsx
import { useComponets } from '@/store/components';
import { Collapse, Input, Select } from 'antd';
import { componentEventMap } from '../../../type';

const ComponentEvent = () => {

  const { curComponent, curComponentId, updateComponentProps } = useComponets();

  // 事件类型改变
  function typeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, { [eventName]: { type: value, } })
  }

  // 消息类型改变
  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value,
        },
      }
    })
  }

  // 消息文本改变
  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
      },
    })
  }

  if (!curComponent) return null;

  return (
    <div>
      {(componentEventMap[curComponent.name] || []).map(setting => {
        return (
          <Collapse key={setting.name} defaultActiveKey={setting.name}>
            <Collapse.Panel header={setting.label} key={setting.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div>动作：</div>
                <div>
                  <Select
                    style={{ width: 160 }}
                    options={[
                      { label: '显示提示', value: 'showMessage' },
                    ]}
                    onChange={(value) => { typeChange(setting.name, value) }}
                    value={curComponent?.props?.[setting.name]?.type}
                  />
                </div>
              </div>
              {
                curComponent?.props?.[setting.name]?.type === 'showMessage' && (
                  <div className='flex flex-col gap-[12px] mt-[12px]'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div>类型：</div>
                      <div>
                        <Select
                          className='w-[160px]'
                          options={[
                            { label: '成功', value: 'success' },
                            { label: '失败', value: 'error' },
                          ]}
                          onChange={(value) => { messageTypeChange(setting.name, value) }}
                          value={curComponent?.props?.[setting.name]?.config?.type}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div>文本：</div>
                      <div>
                        <Input
                          className='w-[160px]'
                          onChange={(e) => { messageTextChange(setting.name, e.target.value) }}
                          value={curComponent?.props?.[setting.name]?.config?.text}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
            </Collapse.Panel>
          </Collapse>
        )
      })}
    </div>
  )
}


export default ComponentEvent;
