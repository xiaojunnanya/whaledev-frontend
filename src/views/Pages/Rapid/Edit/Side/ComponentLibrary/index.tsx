import { memo, useMemo } from 'react'
import { ComponentLibraryStyled } from './style'
import { useComponentConfigStore } from '@/stores/component-config'
import { MaterialItem } from '@/components/MaterialItem'
import { Collapse, Input, Tabs } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
const { Panel } = Collapse;

const a = [
  {
    headTitle: "antd组件",
    smallTitle: "布局",
    name: "Page",
    desc: "页面",
  },
  {
    headTitle: "antd组件",
    smallTitle: "布局",
    name: "Container1",
    desc: "容器1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "布局",
    name: "Container2",
    desc: "容器2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "布局",
    name: "Container1",
    desc: "容器1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "布局",
    name: "Container2",
    desc: "容器2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button1",
    desc: "按钮1",
  },
  {
    headTitle: "antd组件",
    smallTitle: "通用",
    name: "Button2",
    desc: "按钮2",
  },
  {
    headTitle: "ECharts组件",
    smallTitle: "通用",
    name: "e1",
    desc: "e1",
  }
]

export default memo(() => {

  const { componentConfig } = useComponentConfigStore()

  function groupByTitle(items: any[], groupKey: string) {
    const groupedArr: any[] = []
    const titleSet: Set<string> = new Set()
  
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
  }, [componentConfig])

  return (
    <ComponentLibraryStyled>
      <div className='search-input'>
        <Input placeholder='搜索组件' size='small'/>
      </div>
      <Tabs centered>
        {
          components.map((comItem, ComIndex) => {
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
          })
        }
      </Tabs>
    </ComponentLibraryStyled>
  )
})