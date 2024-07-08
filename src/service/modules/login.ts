import { whaleReq } from "..";


/**
 * 获取验证码
 * @param email 邮箱
 * @returns 
 */
export const sendEmail = (email: string, type: 'login' | 'register' | 'reset_password') =>{
    return whaleReq.post({
        url: '/sendEmail',
        data:{ email, type }
    })
}
