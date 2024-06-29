import { memo } from 'react'
import { HeaderStyle } from './style'
import logo from '@/assets/img/favicon.ico'
import { Button } from 'antd'
// import { useSelector } from 'react-redux'

export default memo(() => {
  return (
    <HeaderStyle>
        <div className='logo'>
            <img src={logo} alt="鲸灵开发" />
            <h1>鲸灵开发</h1>
        </div>
        <div className='login'>
            <Button>注册</Button>
            <Button type='primary'>登录</Button>
        </div>
    </HeaderStyle>
  )
})