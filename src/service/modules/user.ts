import { whaleReq } from "..";


export const getUserInfo = () =>{
    return whaleReq.get({ url: '/user/info' })
}

export const getAvatarImage = ( img: string | null ) =>{
    return `/api/images${img}`
}