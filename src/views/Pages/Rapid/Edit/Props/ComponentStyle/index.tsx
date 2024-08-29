import { CSSProperties, memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { Form, Input, InputNumber, Select } from 'antd';
import { useComponetsStore } from '@/stores/components';
import { useComponentConfigStore } from '@/stores/component-config';
import { ComponentSetter } from '@/materials/interface';
import CssEditor from '@/components/CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export default memo(() => {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [ css, setCss ] = useState(`.component{\n\n}`);

  useEffect(() => {
    form.resetFields();
    const data = form.getFieldsValue();
    form.setFieldsValue({...data, ...curComponent?.styles});

    setCss(toCSSStr(curComponent?.styles!));
  }, [curComponent])

  if (!curComponentId || !curComponent) return null;

  function toCSSStr(css: Record<string, any>) {
    let str = `.component {\n`;
    for(let key in css) {
        let value = css[key];
        if(!value) {
            continue;
        }
        // 这里做了样式的合并
        if(['width', 'height'].includes(key) &&  !value.toString().endsWith('px')) {
            value += 'px';
        }

        str += `\t${key}: ${value};\n`
    }
    str += `}`;
    return str;
  }

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

  const handleEditorChange = debounce((value) => {
    setCss(value);

    let css: Record<string, any> = {};

    try {
        const cssStr = value.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
            .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
            .replace('}', '');// 去掉 }

        styleToObject(cssStr, (name, value) => {
            css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
        });

        console.log(css);
        updateComponentStyles(curComponentId, { ...form.getFieldsValue(), ...css }, true);
    } catch(e) {}
  }, 500);

  return (
    <ComponentStyleStyled>

      <div className='whale-style'>
        <div className='whale-style-title'>自定义样式</div>
        <div className='whale-style-csseditor'>
          <CssEditor value={css}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      

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
    </ComponentStyleStyled>
  )
})