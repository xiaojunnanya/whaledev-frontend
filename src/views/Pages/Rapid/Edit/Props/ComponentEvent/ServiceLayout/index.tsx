import { memo, useEffect, useMemo, useState } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { ActionModalStyled } from './style'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { findNodeIndexAndParent } from '@/utils';
import ActionModal from '../ActionModal';
import { useGlobal } from '@/stores/global';
import { useComponetsStore } from '@/stores/components';

const SUCCESSTEXT = '成功后执行此流程'
const FAILTEXT = '失败后执行此流程'
const NORMALTEXT = '编排配置'

export type NodeType = {
  id: string;
  type: 'start' | 'end' | 'normal' | 'condition';
  title: string;
  content?: string; // 内容，也是类似于标题
  config?: any; // 配置项
  children?: NodeType[];
};

interface IProps{
  curEventAction: any[] | undefined
}

const initList: NodeType[] = [
  {
    id: 'start',
    type: 'start',
    title: '开始',
  },
  {
    id: 'end',
    type: 'end',
    title: '结束',
  },
]


export default memo((props: IProps) => {
  const { curEventAction } = props
  const { setComponentActionList } = useComponetsStore()
  const [list, setList] = useState<NodeType[]>([])
  const [ showActionModal, setShowActionModal ] = useState(false)
  const [ saveAction, setSaveAction] = useState<any>({})
  const [ editNode, setEditNode ] = useState<NodeType | null>(null)
  const { setMessage } = useGlobal()

  useEffect(()=>{
    if(curEventAction){
      setList(curEventAction)
    }else{
      setList(initList)
    }
    
  }, [curEventAction])

  useEffect(()=>{
    if(editNode){
      const nodeList = JSON.parse(JSON.stringify(list)) as NodeType[];
      const editNodeL = findNodeIndexAndParent(nodeList, editNode.id)
      editNodeL.selfNode.content = saveAction.label;
      editNodeL.selfNode.config = saveAction.key === 'none' ? {} : saveAction;
      setList(() => [...nodeList])
    }
  }, [saveAction, editNode])


  useEffect(()=>{
    // 遗留的问题：思考是否抛投抛尾
    setComponentActionList(list)
  }, [list])

  // 生成ID
  const generateId = (len = 8) => {
    if (len === 4) return Math.random().toString().slice(2, 6);
    return Math.random().toString().slice(2, 10);
  };

  // 创建节点
  const handleCreateNode = (type: 'normal' | 'condition', id: string) => {
    // 普通节点创建需要弹框输入节点名称
    if (type === 'normal') {
      createNode('节点' + generateId(4), type, id)
    } else {
      // 条件节点直接创建
      createNode('', type, id);
    }
    
  };

  
  // 构建节点
  function createNode(title: string, type: 'normal' | 'condition', id: string) {
    const nodeList = JSON.parse(JSON.stringify(list));
    const node = findNodeIndexAndParent(nodeList, id);
    
    const taskNode = {
      id: generateId(),
      type,
      title,
      content: NORMALTEXT,
      config: {},
      children: [],
    };
    if (!node.parentNode) {
      if (type === 'normal') {
        nodeList.splice(node.index + 1, 0, taskNode);
      } else {
        if(node.selfNode.type === 'start'){
          setMessage({type:'error', text: '开始节点后第一个不能添加分支节点'});
          return;
        }
        if(node.selfNode.type === 'condition'){
          setMessage({type:'error', text: '分支节点后第一个不能添加分支节点'});
          return;
        }
        nodeList.splice(node.index + 1, 0, {
          ...taskNode,
          children: [
            {
              id: generateId(),
              type: 'success',
              children: [],
              title: '成功',
              content: SUCCESSTEXT,
            },
            {
              id: generateId(),
              type: 'fail',
              title: '失败',
              content: FAILTEXT,
              children: [],
            },
          ],
        });
      }
    } else if (node?.parentNode?.type === 'condition') {
      if (type === 'condition') {
        setMessage({type:'error', text: '分支节点后第一个不能添加分支节点'});
        return;
      }
      node.parentNode.children[node.index].children.unshift(taskNode);
    } else if (['normal', 'success', 'fail'].includes(node?.parentNode?.type)) {
      if (type === 'normal') {
        node.parentNode.children.splice(node.index + 1, 0, taskNode);
      } else {
        node.parentNode.children.splice(node.index + 1, 0, {
          ...taskNode,
          children: [
            {
              ...taskNode,
              id: generateId(),
              type: 'success',
              title: '成功',
              content: SUCCESSTEXT,
              children: [],
            },
            {
              ...taskNode,
              id: generateId(),
              type: 'fail',
              title: '失败',
              content: FAILTEXT,
              children: [],
            },
          ],
        });
      }
    }
    setList(() => [...nodeList]);
  }

  //   删除节点
  const handleDelNode = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const nodeList = JSON.parse(JSON.stringify(list));
    const node = findNodeIndexAndParent(nodeList, id);
    if (!node.parentNode) {
      nodeList.splice(node.index, 1);
    } else if (['success', 'fail', 'normal'].includes(node?.parentNode?.type)) {
      node.parentNode.children.splice(node.index, 1);
    } else if (node?.parentNode?.type === 'condition') {
      const parentNode = findNodeIndexAndParent(nodeList, node?.parentNode?.id);
      if (parentNode.parentNode) {
        parentNode.parentNode.children.splice(parentNode.index, 1);
      } else {
        nodeList.splice(parentNode.index, 1);
      }
    }
    setList(() => [...nodeList]);
  };

  // 修改节点行为
  const onEditAction = (node: NodeType) => {
    const nodeList = JSON.parse(JSON.stringify(list)) as NodeType[];
    const editNode = findNodeIndexAndParent(nodeList, node.id);
    const config = editNode.selfNode.config;
    const type = editNode.selfNode.type;
    if(!config || Object.keys(config).length === 0){
      let label = ''
      switch (type) {
        case 'normal': label = NORMALTEXT;break;
        case 'success': label = SUCCESSTEXT;break;
        case 'fail': label = FAILTEXT;break;
      
        default:label = NORMALTEXT;break;
      }
      setSaveAction({
        key:'none',
        label
      })
    }else{
      setSaveAction(config);
    }
    setShowActionModal(true)
    setEditNode(node)
  };


  //   开始节点
  const StartNode = () => {
    return (
      <div className="start-node">
        <div className="circle-btn">开始</div>
        <span className="arrow-line"></span>
        <AddNode id="start" />
      </div>
    );
  };

  //   结束节点
  const EndNode = () => {
    return (
      <div className="end-node">
        <div className="circle-btn gray">结束</div>
      </div>
    );
  };

  //   普通节点
  const NormalNode = ({ node }: { node: NodeType }) => {
    return (
      <div className="normal-node">
        <div className={`node-info ${node.type}`} onClick={() => onEditAction(node)}>
          <div className="title">
            {node.title}
          </div>
          <div className="content">{node.content}</div>
          <DeleteOutlined className="icon-del" onClick={(event) => handleDelNode(event, node.id)} />
        </div>
        <span className="arrow-line"></span>
        <AddNode id={node.id} />
      </div>
    );
  };

  //   条件节点
  const ConditionNode = ({ children, id }: any) => {
    return (
      <div className="condition-node">
        <div className="title">分支</div>
        <div className="node-list">{children}</div>
        <span className="arrow-line"></span>
        <AddNode id={id} />
      </div>
    );
  };

  //   条件节点 - 节点项
  const ConditionItem = ({ type, children }: any) => {
    return (
      <div className="node-item">
        <span className={'left-line ' + type}></span>
        <span className={'right-line ' + type}></span>
        <span className="connect-line"></span>
        <div className="normal-container">{children}</div>
      </div>
    );
  };

  const AddNode = ({ id }: { id: string }) => {
    return (
      <span className="add-node-btn">
        <span className="add-icon">
          <PlusOutlined style={{ fontSize: 16, color: '#fff' }} />
          <div className="popover">
            <a onClick={() => handleCreateNode('normal', id)}>普通节点</a>
            <a onClick={() => handleCreateNode('condition', id)}>分支节点</a>
          </div>
        </span>
      </span>
    );
  };

  const renderNodeList = useMemo(() => {
    function renderNode(nodes: any) {
      return nodes.map((node: any) => {
        switch (node.type) {
          case 'start':
            return <StartNode key={node.id} />;
          case 'end':
            return <EndNode key={node.id} />;
          case 'normal':
          case 'success':
          case 'fail':
            return <NormalNode key={node.id} node={node} />;
          case 'condition':
            return (
              <ConditionNode key={node.id} title={node.title} id={node.id}>
                {node.children.map((item: any, index: number) => {
                  return (
                    <ConditionItem key={item.id} type={index === 0 ? 'start' : index == node.children.length - 1 ? 'end' : 'center'}>
                      {renderNode([item])}
                      {renderNode(item.children)}
                    </ConditionItem>
                  );
                })}
              </ConditionNode>
            );
        }
      });
    }

    return renderNode(list)
  }, [list])


  return (
    <ActionModalStyled>

      <ActionModal 
      showModal={{ showActionModal, setShowActionModal }}
      handleAction={{ saveAction, setSaveAction }}
      />

      <InfiniteViewer
        className="node-viewer"
        displayHorizontalScroll={false}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.5, 10]}
        useResizeObserver={true}
      >
        <div className="node-container">{renderNodeList}</div>
      </InfiniteViewer>
    </ActionModalStyled>
  )
})