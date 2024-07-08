import { memo } from 'react'

import { LockOutlined, MailOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { changeMode } from '@/store/modules/login';
import { useDispatch } from 'react-redux';

export default memo(() => {

  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    console.log('Success:', values);
  }

  const getEmailCode = () =>{}
  const updateCode = () =>{}

  const aClick = (e: any, index: number)=>{
    e.stopPropagation()
    if(index === 1){
      dispatch(changeMode('login'))
    }
  }

  return (
    <>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item name="username"
              rules={[
                { required: true, message: '请输入邮箱' },
                {
                    validator(rule, value, callback) {
                      // 必须既有数字也有字母
                      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                          callback('请输入合法的邮箱格式');
                      }else{
                          return Promise.resolve()
                      }
                    },
                }
              ]} >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <div className='emailCode'>
              <Form.Item name="emailCode"
                  rules={[{ required: true, message: '请输入邮箱验证码' }]} >
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} placeholder="请邮箱验证码" />
              </Form.Item>
              <Button type='primary' onClick={getEmailCode}>获取验证码</Button>
          </div>
          <Form.Item name="name"
              rules={[{ required: true, message: '请输入昵称' }]} >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 8, max: 18, message: '密码长度不能小于8位且不能超过18位'},
                {
                  validator(rule, value, callback) {
                    // 正则：必须既有数字也有字母
                    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(value)) {
                      callback('密码必须要由数字和字母组成');
                    }else{
                      return Promise.resolve()
                    }
                  },
                }
                ]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="passwordTwo"
              rules={[
                { required: true, message: '请输入密码' },
                ({getFieldValue})=>({
                    validator(rule,value){
                        if(!value || getFieldValue('password') === value){
                            return Promise.resolve()
                        }
                        return Promise.reject("两次密码输入不一致")
                    }
                })
                ]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请再次输入密码" />
          </Form.Item>
          <div className='checkCode'>
              <Form.Item name="checkCode"
                  rules={[{ required: true, message: '请输入验证码' }]} >
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
              </Form.Item>
              <div onClick={updateCode}>
                  <img src='' alt="验证码"/>
              </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 1)}}>去登录？</a>
          </div>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> 注册 </Button>
          </Form.Item>
      </Form>
    </>
  )
})