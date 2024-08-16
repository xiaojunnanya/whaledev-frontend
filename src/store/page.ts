import { create } from "zustand";

interface IState{
    width: number
    setWidth: (width: number) => void
}

export const usePage = create<IState>((set) => ({
    width:0,
    setWidth: (width: number) => set(() => ({
        width
    }))
}));