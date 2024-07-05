import { memo } from 'react'
import { HeaderStyle } from './style'
import logo from '@/assets/images/favicon.ico'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

export default memo(() => {

  const naviage = useNavigate()

  return (
    <HeaderStyle>
        <div className='logo'>
            <img src={logo} alt="鲸灵开发" />
            <h1>鲸灵开发</h1>
        </div>
        <div className='login'>
            {/* <Button>注册</Button> */}
            <Button type='primary' onClick={()=>{naviage('/login')}}>登录</Button>
        </div>
    </HeaderStyle>
  )
})