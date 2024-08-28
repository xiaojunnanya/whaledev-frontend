import { create } from "zustand";

type IMode = 'login' | 'forget' | 'account'

interface IState{
    mode: IMode
    setMode: (mode: IMode) => void
}

export const useMode = create<IState>((set) => ({
    mode:'login',
    setMode: (mode: IMode) => set(() => ({
        mode: mode
    }))
}));