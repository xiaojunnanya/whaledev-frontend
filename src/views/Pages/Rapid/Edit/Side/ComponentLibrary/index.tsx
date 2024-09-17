import { memo, useMemo, useState } from 'react'
import { ComponentLibraryStyled } from './style'
import { useComponentConfigStore } from '@/stores/component-config'
import { MaterialItem } from '@/components/MaterialItem'
import { Collapse, Input, Tabs } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { debounce } from 'lodash-es'
const { Panel } = Collapse;

export default memo(() => {
  const [ inputValue, setInputValue ] = useState('')
  const { componentConfig } = useComponentConfigStore()

  function groupByTitle(items: any[], groupKey: string) {
    const groupedArr: any[] = []
    const titleSet: Set<string> = new Set()
    
    if(inputValue) items = items.filter(item => item.desc.includes(inputValue) || item.name.toLowerCase().includes(inputValue.toLowerCase()))

    items.forEach(item => {
      const label = item[groupKey]

      if (!titleSet.has(label)) {
        titleSet.add(label)
        groupedArr.push({
          label,
          children: [item]
        })
      } else {
        const group = groupedArr.find(groupItem => groupItem.label === label)
        group?.children.push(item)
      }
    })
  
    return groupedArr
  }
  

  const components = useMemo(() => {
    let childArr = groupByTitle(Object.values(componentConfig).filter(item => item.name !== 'Page'), 'headTitle')
    childArr.forEach(item => {
      item.children = groupByTitle(item.children, 'smallTitle')
    })

    return childArr
  }, [componentConfig, inputValue])
  
  const handleChange = debounce((value: string) => {
    setInputValue(value)
  }, 500)

  return (
    <ComponentLibraryStyled>
      <div className='search-input'>
        <Input placeholder='搜索组件' allowClear size='small' onChange={(e)=>{handleChange(e.target.value)}}/>
      </div>
      <Tabs centered>
        {
          components.length !== 0 ? components.map((comItem, ComIndex) => {
            return (
              <Tabs.TabPane tab={comItem.label} key={ComIndex}>
                <Collapse ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                  {
                    comItem.children.map((item: any, index: number) => {
                      return (
                        <Panel header={item.label} key={index}>
                          {
                            item.children.map((childItem: any, childIndex: number) => {
                              return (
                                <MaterialItem key={childItem.name + childIndex} name={childItem.name} desc={childItem.desc}></MaterialItem>
                              )
                            })
                          }
                        </Panel>
                      )
                    })
                  }
                </Collapse>
              </Tabs.TabPane>
            )
          }) : <div className='noComponents'>暂无相关组件</div>
        }
      </Tabs>
    </ComponentLibraryStyled>
  )
})