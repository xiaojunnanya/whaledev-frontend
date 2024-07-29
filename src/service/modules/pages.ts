import { whaleReq } from "..";


/**
 * 新建页面
 */
export const createPage = (args: any) =>{
    return whaleReq.post({
        url: '/pages/create',
        data:{
            ...args
        }
    })
}


// 获取页面
export const getPage = (projectId: string) =>{
    return whaleReq.get({
        url: `/pages/${projectId}`
    })
}


// 更新页面
export const updatePage = (args: any) =>{
    return whaleReq.post({
        url: '/pages/update',
        data:{
            ...args
        }
    })
}

// 删除页面
export const deletePage = (pageId: string) => whaleReq.delete({url:`/pages/${pageId}`})