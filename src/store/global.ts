import { create } from "zustand";

interface MessageState {
    message: IState,
    setMessage: (message: IState) => void
}

interface IState{
    type: 'success' | 'error' | 'warning' | 'info' | null
    text: string
}

export const useMessage = create<MessageState>((set) => ({
    message:{
        type: null,
        text: ''
    },
    setMessage: (message: IState) => set(() => ({
        message: {
            type: message.type,
            text: message.text
        }
    }))
}));