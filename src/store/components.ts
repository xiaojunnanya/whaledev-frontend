import { getComponentById } from '@/utils';
import {create} from 'zustand';

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

interface IState {
  components: Component[]
  addComponent: (component: Component, parentId: number) => void
}

export const useComponets = create<IState>((set) => ({
  components: [],
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
    })
}))