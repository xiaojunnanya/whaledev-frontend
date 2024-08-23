type ICategory = '基础组件' | '业务组件' | '自定义组件' | '其他组件'

type IType = '基础组件' | '容器组件' | '展示组件' | '交互组件' | '布局组件' | '其他组件'

/**
 * 
 * @param {string} id 组件ID(算法生成)
 * @param {ICategory} category 组件大分类
 * @param {IType} type 组件小分类
 * @param {string} name 组件名称
 * @param {any} props 组件属性
 * @param {any} event 组件事件
 * @param {any} style 组件样式
 * @param {ComponentType[]} children 子组件
 */
export interface ComponentType {
    id: string;
    category: ICategory;
    type: IType;
    name: string;
    props: any;
    event: any;
    style: any;
    children: ComponentType[];
}
  