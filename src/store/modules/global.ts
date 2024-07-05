import { createSlice } from '@reduxjs/toolkit'

interface IState{
    globalMessage: {
        type: 'success' | 'error' | 'warning' | 'info' | null
        message: string
    }
}

const initialState: IState = {
    globalMessage:{
        type: null,
        message: ''
    }
}

const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        changeGlobalMessage(state, action){
            state.globalMessage = action.payload
        }
    }
})

export const { changeGlobalMessage } = globalSlice.actions

export default globalSlice.reducer