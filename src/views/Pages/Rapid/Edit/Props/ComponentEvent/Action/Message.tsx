import { Form, Input, Radio } from 'antd'
import { memo } from 'react'

const Console = memo(() => {
  return (
    <div>
      <Form.Item label="提示类型" name="type">
        <Radio.Group buttonStyle="solid" optionType="button">
          <Radio value="success">成功</Radio>
          <Radio value="info">信息</Radio>
          <Radio value="warning">警告</Radio>
          <Radio value="error">错误</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="提示内容" name="content" rules={[{ required: true, message: '请输入提示内容' }]}>
        <Input placeholder="输入提示内容" />
      </Form.Item>
    </div>
  )
})

export default Console