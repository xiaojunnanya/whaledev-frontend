export const ButtonProps = [{
    name: 'type',
    label: '按钮类型',
    type: 'select',
    options: [{ label: '主按钮', value: 'primary' }, { label: '次按钮', value: 'default' }],
  }, {
    name: 'children',
    label: '文本',
    type: 'input',
    value:'按钮'
}]


export const ButtonEvents = [{
    name: 'onClick',
    label: '点击事件',
  }]