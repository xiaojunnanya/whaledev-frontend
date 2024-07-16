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
 * 
 * @param email 邮箱
 * @param password 密码
 * @param code 验证码
 * @returns 
 */
export const login = (email: string, password: string, checkCode: string) =>{
    return whaleReq.post({
        url: '/login/login',
        data: { email, password, checkCode }
    })
}