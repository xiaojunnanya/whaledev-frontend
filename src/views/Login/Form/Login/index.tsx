import { memo, useEffect, useState } from 'react'

import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '@/store';
import { changeMode } from '@/store/modules/login';
import { checkCodeServer, login } from '@/service/modules/login';
import { changeGlobalMessage } from '@/store/modules/global';
import { useNavigate } from 'react-router-dom';
import SparkMD5 from 'spark-md5';

export default memo(() => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [ codeImg, setCodeImg ] = useState<string>('')
  const naviage = useNavigate()
  
  useEffect(()=>{
    updateCode()
  }, [])

  const onFinish = async (values: any) =>{
    const spark = new SparkMD5()
    spark.append(values.password)
    const password = spark.end()
    values.password = password
    const { data } = await login(values)
    
    if(data.statusCode === 1200){
      dispatch(changeGlobalMessage({ type:'success', message: data?.data}))
    }else{
      dispatch(changeGlobalMessage({ type:'error', message: data?.data || '服务器异常，请稍后重试' }))
      updateCode()
      form.resetFields(['checkCode'])
    }
  }

  const updateCode = () =>{
    setCodeImg(checkCodeServer())
  }

  const aClick = (e: any, index: number)=>{
    e.stopPropagation()
    if(index === 1){
      dispatch(changeMode('forget'))
    }
    if(index === 2){
      dispatch(changeMode('account'))
    }
  }

  return (
    <>
      <Form name="normal_login" className="login-form" onFinish={onFinish} form={form}
      initialValues={{email: '2376974436@qq.com', password: 'qwer12345', checkCode: ''}}
      >
          <Form.Item name="email"
              rules={[{ required: true, message: '请输入邮箱' }]} >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="password"
              rules={[{ required: true, message: '请输入密码' }]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请输入密码" />
          </Form.Item>
          <div className='checkCode'>
              <Form.Item name="checkCode"
                  rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} 
                  placeholder="请输入验证码"/>
              </Form.Item>
              <div onClick={updateCode}>
                  <img src={codeImg} alt="验证码"/>
              </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 1)}}>忘记密码？</a>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 2)}}>没有账户？</a>
          </div>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
              <Button 
                className="login-form-button" 
                style={{marginTop:'20px'}}
                onClick={()=>{naviage('/')}}
              > 返回首页 </Button>
          </Form.Item>
          
          {/* <div className='qqimg'>
              <span>QQ快捷登录</span>
              <img src={QqImg}/>
          </div> */}
      </Form>
    </>
  )
})