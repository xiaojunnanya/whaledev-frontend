import { whaleReq } from "..";


/**
 * 新建项目
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

/**
 * 获取项目
 * @returns 
 */
export const getProject = () => whaleReq.get({ url: '/project/get'});

/**
 * 删除项目
 * @param id 
 * @returns 
 */
export const deleteProject = (id: number) => whaleReq.delete({ url: `/project/delete/${id}` })


/**
 * 更新项目
 */
export const updateProject = (args: any) =>{
    return whaleReq.post({
        url: '/project/update',
        data:{
            ...args,
            projectIcon:'/projectIcon/default-avatar.jpg'
        }
    })
}