import { PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren{
    id: string;
    name: string;
    [key: string]: any
}

type IType = 'select' | 'input'
export interface ComponentSetter {
    name: string; // 字段名
    label: string; // 前面的文案
    type: IType; // 表单类型，比如 select
    [key: string]: any;
}

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    desc: string;
    setter?: {
        title: string,
        propsList: ComponentSetter[]
    }[]
    component: any
}