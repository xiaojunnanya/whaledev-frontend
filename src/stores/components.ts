import { getComponentById } from '@/utils';
import { CSSProperties } from 'react';
import {create} from 'zustand';

export interface Component {
  id: string;
  name: string;
  props: any;
  styles?: CSSProperties;
  desc: string;
  children?: Component[];
  parentId?: string;
  events?: any[];
}

interface State {
  components: Component[];
  curComponentId?: string | null;
  curComponent: Component | null;
  componentActionList: any[];
}

interface Action {
  addComponent: (component: Component, parentId?: string) => void;
  updeteComponent: (component: Component[]) => void;
  deleteComponent: (componentId: string) => void;
  updeteComponentById: (componentId: string, component: Component) => void;
  updateComponentProps: (componentId: string, props: any) => void;
  updateComponentEvents: (componentId: string, event: any) => void;
  setCurComponentId: (componentId: string | null) => void;
  updateComponentStyles: (componentId: string, styles: CSSProperties, replace?: boolean) => void;
  setComponentActionList: (actionList: any[]) => void;
}

export const useComponetsStore = create<State & Action>(
  (
    (set, get) => ({
    components: [
      {
        id: '0',
        name: 'Page',
        props: {},
        desc: '页面',
        children: []
      }
    ],
    curComponentId: null,
    curComponent: null,
    componentActionList: [],
    updeteComponent: (component: Component[]) => 
      set(() => ({
        components: component
      })),
    setCurComponentId: (componentId) =>
      set((state) => ({
        curComponentId: componentId,
        curComponent: getComponentById(componentId, state.components),
      })),
    addComponent: (component, parentId) =>
      set((state) => {
        if (parentId) {
          const parentComponent = getComponentById(
            parentId,
            state.components
          );

          if (parentComponent) {
            if (parentComponent.children) {
              parentComponent.children.push(component);
            } else {
              parentComponent.children = [component];
            }
          }

          component.parentId = parentId;
          return {components: [...state.components]};
        }
        return {components: [...state.components, component]};
      }),
    deleteComponent: (componentId) => {
      if (!componentId) return;

      const component = getComponentById(componentId, get().components);
      if (component?.parentId) {
        const parentComponent = getComponentById(
          component.parentId,
          get().components
        );

        if (parentComponent) {
          parentComponent.children = parentComponent?.children?.filter(
            (item) => item.id !== componentId
          );

          set({components: [...get().components]});
        }
      }
    },
    updeteComponentById: (componentId, comp) =>
      set((state) => {
        let component = getComponentById(componentId, state.components);
        if (component) {
          component = {...component, ...comp};
          return {components: [...state.components]};
        }
        return { components: [...state.components] }
      }),
    updateComponentProps: (componentId, props) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          component.props = {...component.props, ...props};

          return {components: [...state.components]};
        }

        return {components: [...state.components]};
      }),
    updateComponentEvents: (componentId, events) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          if(component.events){
              // component.events.push(events);
              for (const item of component.events) {
                if(item.name === events.name){
                  item.action = events.action;
                  break
                }
              }
          }else{
              component.events = [events];
          }

          return {components: [...state.components]};
        }

        return {components: [...state.components]};
      }),
    updateComponentStyles: (componentId, styles, replace) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          component.styles = replace ? {...styles} : {...component.styles, ...styles};
  
          return {components: [...state.components]};
        }
  
        return {components: [...state.components]};
      }),
    setComponentActionList: (list: any[]) => 
      set(() => ({
        componentActionList: list
      }))
    })
  )
);
