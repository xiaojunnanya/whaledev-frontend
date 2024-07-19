import { whaleReq } from "..";


/**
 * 获取邮箱验证码
 * @param email 邮箱
 * @returns 
 */
export const sendEmail = (email: string, type: 'login' | 'register' | 'reset_password') =>{
    return whaleReq.post({
        url: '/sendEmail',
        data:{ email, type }
    })
}


// 图形验证码
export const checkCodeServer = () =>{
    const time = new Date().getTime()
    return `/api/sendEmail/imgcode?time=${time}`
}


/**
 * 登录
 * @param email 邮箱
 * @param password 密码
 * @param code 验证码
 * @returns 
 */
export const login = (args: any) =>{
    return whaleReq.post({
        url: '/login/login',
        data: {
            ...args
        }
    })
}

/**
 * 注册
 * @param args 
 * @returns 
 */
export const register = (args: any) =>{
    return whaleReq.post({
        url: '/login/register',
        data: { 
            ...args
        }
    })
}

/**
 * 忘记密码
 * @param args 
 * @returns 
 */
export const resetPassword = (args: any) =>{
    return whaleReq.post({
        url: '/login/resetPassword',
        data: { 
            ...args
        }
    })
}