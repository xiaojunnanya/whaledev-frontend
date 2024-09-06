import { Component } from "@/stores/components";

/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: string | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}


// 查找节点的索引及其父节点
export function findNodeIndexAndParent(children: any, nodeId: string, parentNode = null): any {
  for (let i = 0; i < children.length; i++) {
    if (children[i].id === nodeId) {
      return { index: i, parentNode, selfNode: children[i] };
    }
    if (children[i].children) {
      const result = findNodeIndexAndParent(children[i].children, nodeId, children[i]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}


/**
 * 事件行为是数组结构，为了保证串联执行，需要转换成链表结构
 * 必须保证第一个行为执行完以后，再执行第二个行为
 * @param params 事件触发时，组件传递的参数
 */
export function handleActionFlow(actions: any[] = [], params: any) {
  /**
   * 行为数组转换成链表结构
   */
  const nodes = convertArrayToLinkedList(actions);
  if (nodes?.action) {
    execAction(nodes, params);
  }
}

// 把工作流转换为链表结构，此算法需要进一步优化。
function convertArrayToLinkedList(nodes: any, isSuccessBranch = true) {
  let linkedList = null;
  let currentNode: any = null;

  for (const node of nodes) {
    if (node.type === 'start' || node.type === 'end') {
      continue;
    }

    let newNode: any = { action: { ...node.config } };

    if (node.type === 'condition') {
      const successBranch = convertArrayToLinkedList(node.children.find((child: any) => child.title === '成功')?.children || [], true);
      const failBranch = convertArrayToLinkedList(node.children.find((child: any) => child.title === '失败')?.children || [], false);

      const behindList = nodes.slice(nodes.indexOf(node) + 1).filter((item: any) => item.type !== 'end');

      newNode = {
        success: successBranch,
        fail: failBranch,
      };

      if (!currentNode) {
        linkedList = newNode;
      } else if (isSuccessBranch) {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      } else {
        if (!currentNode.fail) {
          currentNode.fail = newNode;
        } else {
          let current = currentNode.fail;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      }

      currentNode = newNode;

      /**
       * 如果条件分支后面还有节点，则需要把后面的节点全部当做成功节点追加到条件分支的后面
       * TODO: 此算法及其复杂，需要进一步优化。
       */
      if (behindList.length > 0) {
        let sucNodes1 = convertArrayToLinkedList(behindList, true);
        if (!currentNode.success) {
          currentNode.success = sucNodes1;
        } else {
          let current = currentNode.success;
          while (current.next) {
            current = current.next;
          }
          while (sucNodes1.action) {
            current.next = {
              action: sucNodes1.action,
            };
            current = current.next;
            sucNodes1 = sucNodes1.next || {};
          }
        }
        let sucNodes2 = convertArrayToLinkedList(behindList, true);
        if (!currentNode.fail) {
          currentNode.fail = sucNodes2;
        } else {
          let current = currentNode.fail;
          while (current.next) {
            current = current.next;
          }
          while (sucNodes2.action) {
            current.next = {
              action: sucNodes2.action,
            };
            current = current.next;
            sucNodes2 = sucNodes2.next || {};
          }
        }
      }
    } else {
      if (!currentNode) {
        linkedList = currentNode = newNode;
      } else if (isSuccessBranch) {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      } else {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      }
    }
  }

  return linkedList;
}

/**
 * 递归执行事件行为
 * params是按钮触发是，组件传递的参数
 * action中的data为行为配置中手工配置的参数
 */
const execAction = (node: any, params: any = {}) => {
  if (!node || !node?.action) return;
  try {
    switch (node.action.key) {
      case 'link': console.log('link...');break;
      case 'message': console.log('message...');break;
      default: break;
    }
    execAction(node.next, params);

  } catch (error) {
    console.error(`事件流[${node.action.label}执行异常]`, error);
  }
};