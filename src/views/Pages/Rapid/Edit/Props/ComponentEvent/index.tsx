import { memo } from 'react'
import { ComponentEventStyled } from './style'
import { useComponetsStore } from '@/stores/components';
import { useComponentConfigStore } from '@/stores/component-config';
import { Collapse, CollapseProps, Select } from 'antd';
import { GoToLink } from './actions/GoToLink';
import { ShowMessage } from './actions/ShowMessage';

export default memo(() => {

  const { curComponentId, curComponent, updateComponentProps } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  function selectAction(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, { [eventName]: { type: value, } })
  }

  const items: CollapseProps['items'] = (componentConfig[curComponent.name].events || []).map(event => {
      return {
          key: event.name,
          label: event.label,
          children: <div>
              <div className='flex items-center'>
                  <div>动作：</div>
                  <Select style={{ width: 200 }}
                      options={[
                          { label: '显示提示', value: 'showMessage' },
                          { label: '跳转链接', value: 'goToLink' },
                      ]}
                      onChange={(value) => { selectAction(event.name, value) }}
                      value={curComponent?.props?.[event.name]?.type}
                  />
              </div>
              {
                curComponent?.props?.[event.name]?.type === 'goToLink' && <GoToLink event={event} />
              }
              {
                curComponent?.props?.[event.name]?.type === 'showMessage' && <ShowMessage event={event}/>
              }
          </div>
      }
  })

  return (
    <ComponentEventStyled>
      <Collapse items={items} ghost/>
    </ComponentEventStyled>
  )
})