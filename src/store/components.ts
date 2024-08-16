import { getComponentById } from '@/utils';
import {create} from 'zustand';

// id/name/props/children/group(哪个组)/category(哪个类)
// 在思考有没有加入一个类型：是布局类的还是内容类的
export interface Component {
  /**
   * 组件唯一标识
   */
  id: number;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  props: any;
  /**
   * 子组件
   */
  children?: Component[];
}

// 遗留的问题：目前的id都是number类型，到时候拆除组件的时候需要变为string
interface IState {
  components: Component[]
  curComponentId: number
  curComponent: Component | null
  addComponent: (component: Component, parentId: number) => void
  setCurComponentId: (id: number) => void
  updateComponentProps: (componentId: number, props: any) => void
}

export const useComponets = create<IState>((set) => ({
  // 组件列表
  components: [],
  curComponentId: -1,
  curComponent: null,
  // 添加组件
  addComponent: (component, parentId) =>
    // set((state) => {
    //   return {components: [...state.components, component]};
    // }),
    set((state) => {
      // 如果有上级ID，将当前组件添加到父组价你的children中
      if (parentId) {
        // 通过父id递归查找父组件
        const parentComponent = getComponentById(state.components, parentId);

        if (parentComponent) {
          if (parentComponent?.children) {
            parentComponent?.children?.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        return {components: [...state.components]};
      }
      return {components: [...state.components, component]};
    }),
  // 设置当前选择的组件
  setCurComponentId: (id) => set((state) => 
    ({
      curComponentId: id,
      curComponent: getComponentById(state.components, id)
    })
  ),
  updateComponentProps: (componentId: number, props: any) =>
    set((state) => {
      const component = getComponentById(state.components, componentId);
      if (component) {
        component.props = {...component.props, ...props};
        return {components: [...state.components]};
      }
      return {components: [...state.components]};
    }),
}))