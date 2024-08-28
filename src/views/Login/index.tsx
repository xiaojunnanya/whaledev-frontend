import { memo } from 'react'

import { LoginStyled } from './style'

import LoginModel from './Form/Login'
import AccountModel from './Form/Register'
import ForgetModel from './Form/Forget'

import { useMode } from '@/stores/login'

const Login = memo(() => {
    const { mode } = useMode()

    const showModel  = () =>{
        switch (mode) {
            case 'login':
                return <LoginModel></LoginModel>
            case 'account':
                return <AccountModel></AccountModel>
            case 'forget':
                return <ForgetModel></ForgetModel>
            default:
                return <LoginModel></LoginModel>
        }
    }

  return (
    <LoginStyled>
        <div className="login-body">
            <div className="bg"></div>
            <div className="login-panel">
                {
                    showModel()
                }
            </div>
        </div>
    </LoginStyled>
  )
})

export default Login