import { whaleReq } from "..";


export const getUserInfo = () =>{
    return whaleReq.get({ url: '/user/userInfo' })
}

export const getAvatarImage = ( img: string | null ) =>{
    return `/api${img}`
}