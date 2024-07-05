import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './modules/login'
import globalReducer from './modules/global'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        login: loginReducer,
        global: globalReducer
    }
})


type StateFnType = typeof store.getState
type RootState = ReturnType<StateFnType>

// 拿useDispatch的类型
type DispatchType = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector
export const useAppDispatch: ()=> DispatchType = useDispatch
export const useAppShallowEqual = shallowEqual

export default store 