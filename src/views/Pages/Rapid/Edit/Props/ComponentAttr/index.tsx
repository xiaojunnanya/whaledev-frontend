import { memo, useEffect } from 'react'
import { ComponentAttrStyled } from './style'
import { useComponetsStore } from '@/stores/components';
import { ComponentConfig, ComponentSetter, useComponentConfigStore } from '@/stores/component-config';
import { Form, Input, Select } from 'antd';

export default memo(() => {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentProps } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({...data, ...curComponent?.props});
  }, [curComponent])

  if (!curComponentId || !curComponent) return null;
  
  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;
  
    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input') {
      return <Input />
    }
  }

  function valueChange(changeValues: ComponentConfig) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  return (
    <ComponentAttrStyled>
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
      >
        <div className='whale-attr'>
          <div className='whale-attr-title'>基础</div>
          <Form.Item label="组件ID">
            <Input value={curComponent.id} disabled />
          </Form.Item>
          <Form.Item label="组件名称">
            <Input value={curComponent.name} disabled />
          </Form.Item>
          <Form.Item label="组件描述">
            <Input value={curComponent.desc} disabled/>
          </Form.Item>
        </div>

        {
          componentConfig[curComponent.name]?.setter?.map(item => {
            return (
              <div className='whale-attr'>
                <div className='whale-attr-title'>{item.title}</div>
                {
                  item.propsList.map(setter =>{
                    return (
                      <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElememt(setter)}
                      </Form.Item>
                    )
                  })
                }
              </div>
            )
          })
        }
      </Form>
    </ComponentAttrStyled>
  )
})