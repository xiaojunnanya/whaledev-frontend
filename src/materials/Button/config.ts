
import Button from ".";
import { ComponentConfig } from "../interface";

export const ButtonConfig: ComponentConfig = {
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
    ],
    stylesSetter: [
        {
            title: '按钮样式',
            styleList: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                }
            ]
        }
    ],
}