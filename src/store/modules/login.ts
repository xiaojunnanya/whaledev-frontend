import { createSlice } from '@reduxjs/toolkit'


interface IState{
    mode: 'login' | 'forget' | 'account',
}

const initialState: IState = {
    mode:'login',
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        // 选择注册方式：登录、注册、忘记密码
        changeMode(state, { payload }){
            state.mode = payload
        }
    }
})

export const { changeMode } = loginSlice.actions

export default loginSlice.reducer