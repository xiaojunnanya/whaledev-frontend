import { CSSProperties, memo, useEffect } from 'react'
import { ComponentStyleStyled } from './style'
import { Form, Input, InputNumber, Select } from 'antd';
import { useComponetsStore } from '@/stores/components';
import { useComponentConfigStore } from '@/stores/component-config';
import { ComponentSetter } from '@/materials/interface';
import CssEditor from '@/components/CssEditor';

export default memo(() => {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({...data, ...curComponent?.styles});
  }, [curComponent])

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;
  
    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input') {
      return <Input />
    } else if (type === 'inputNumber') {
        return <InputNumber />
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
        updateComponentStyles(curComponentId, changeValues);
    }
  }

  return (
    <ComponentStyleStyled>
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
      >
        {
          componentConfig[curComponent.name]?.stylesSetter?.map((item, index) => {
            return (
              <div className='whale-style' key={index}>
                <div className='whale-style-title'>{item.title}</div>
                {
                  item.styleList.map(style =>{
                    return (
                      <Form.Item key={style.name} name={style.name} label={style.label}>
                        {renderFormElememt(style)}
                      </Form.Item>
                    )
                  })
                }
              </div>
            )
          })
        }
      </Form>

      {/* <div style={{
        height: '200px',
        border: '1px solid #ccc',
      }}>
        <CssEditor value={`.comp{\n\n}`}/>
      </div> */}
    </ComponentStyleStyled>
  )
})