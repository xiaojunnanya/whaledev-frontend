import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { componentPropsMap } from '../../../type';
import { useComponets } from '@/store/components';

const Setting: React.FC = () => {

  const { curComponentId, updateComponentProps, curComponent } = useComponets();

  const [form] = Form.useForm();

  useEffect(() => {
    // 初始化表单
    form.setFieldsValue(curComponent?.props);
  }, [curComponent])

  /**
   * 动态渲染表单元素
   * @param setting 元素配置
   * @returns 
   */
  function renderFormElememt(setting: any) {
    const { type, options, value } = setting;

    if (type === 'select') {
      return (
        <Select options={options} />
      )
    } else if (type === 'input') {
      return (
        <Input value={value}/>
      )
    }
  }

  // 监听表单值变化，更新组件属性
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }


  if (!curComponentId || !curComponent) return null;


  // 根据组件类型渲染表单
  return (
    <div style={{paddingTop: '20px'}}>
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        {(componentPropsMap[curComponent.name] || []).map(setting => {
          return (
            <Form.Item name={setting.name} label={setting.label} key={setting.name}>
              {renderFormElememt(setting)}
            </Form.Item>
          )
        })}
      </Form>
    </div>
  )
}

export default Setting;