import { whaleReq } from "..";


/**
 * 获取邮箱验证码
 * @param email 邮箱
 * @returns 
 */
export const createProject = (args: any) =>{
    return whaleReq.post({
        url: '/project/create',
        data:{
            ...args,
            projectState:'inProgress',
            projectIcon:'/projectIcon/default-avatar.jpg'
        }
    })
}
