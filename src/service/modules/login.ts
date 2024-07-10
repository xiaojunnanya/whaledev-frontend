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
export const checkCodeServer = ( time: number ) =>{
    return `/api/sendEmail/imgcode?time=${time}`
}