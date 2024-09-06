import { Form, Input, Radio } from 'antd'
import { memo } from 'react'

const Link = memo(() => {
  return (
    <Form.Item label="跳转方式" name={'link'}>
        <Input.TextArea></Input.TextArea>
      </Form.Item>
  )
})

export default Link