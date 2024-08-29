import {create} from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '@/materials/Page';

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
 
interface State {
    componentConfig: {[key: string]: ComponentConfig};
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void
}
// compnent 名字和 Component 实例的映射
export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            desc: '容器',
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            desc: '按钮',
            component: Button,
            setter: [
                {
                    title: '按钮属性',
                    propsList: [
                        {
                            name: 'type',
                            label: '按钮类型',
                            type: 'select',
                            options: [
                                {label: '主按钮', value: 'primary'},
                                {label: '次按钮', value: 'default'},
                            ],
                        },
                        {
                            name: 'text',
                            label: '文本',
                            type: 'input',
                        }
                    ]
                }
            ]
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            desc: '页面',
            component: Page
        },
    },
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));