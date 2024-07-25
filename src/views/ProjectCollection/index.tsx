import { memo, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ProjectCollectionStyled } from './style'
import { Avatar, Button, Card, Col, ConfigProvider, Form, Input, Modal, Pagination, Popconfirm, Radio, Row, Select, Tag } from 'antd'
import type { PaginationProps } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { createProject, deleteProject, getProject, searchProject, updateProject } from '@/service/modules/project';
import { useAppDispatch } from '@/store';
import { changeGlobalMessage } from '@/store/modules/global';
import { getImageShow } from '@/service/modules/common'
import zhCN from 'antd/es/locale/zh_CN';

const { Meta } = Card;
const { Option } = Select

const typeTextMap = {
  one: '类型一',
  two: '类型二',
  other: '其他类型',
}
const typeData = Object.keys(typeTextMap)

enum projectStateType {
  inProgress,
  completed,
  paused,
  obsolete
}
const stateTextMap = {
  inProgress: '进行中',
  completed: '已完成',
  paused: '已暂停',
  obsolete: '已废弃'
}
const stateTextColor = {
  inProgress: '#007BFF',
  completed: '#28A745',
  paused: '#6C757D',
  obsolete: '#DC3545'
}
const stateData = Object.keys(stateTextMap)

interface FieldType {
  projectName: string;
  projectDesc?: string;
  projectType: string;
  projectState: projectStateType
};

interface projectDataType extends FieldType{
  id: number,
  projectId:string,
  projectIcon:string,
}

// 搜索防抖+分页：一页八个数据，然后设置滚轮区域
// 对于类型和状态调用要用一个接口来弄，不要在前端写死
// 考虑loading加载是否需要，感觉在做分页的时候还是需要的
export default memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ modalType, setModalType ] = useState<'create' | 'edit'>('create')
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [ listData, setListData ] = useState<projectDataType[]>([])
  const [ searchValue, setSearchValue ] = useState('')
  const [ editId, setEditId ] = useState<number>(-1)
  // 总数
  const [ totalPage, setTotalPage ] = useState(0)
  // 当前位置
  const [ currentPage, setCurrentPage ] = useState(1)


  useEffect(()=>{
    getAllProjects(1)
  }, [])


  const getAllProjects = async (page: number) => {
    const { data } = await getProject(page)
    setListData(data.data)
    setTotalPage(data.total)
    setCurrentPage(data.page)

    // 当前页最后一个删除的时候跳转到前一页
    if( data.data.length === 0 && page > 1 ){
      getAllProjects(data.page - 1)
    }
  }

  const onOk = () => {
    form.validateFields().then(async (res) =>{

      const { data } = modalType === 'create' ? await createProject(res) : await updateProject({
        ...res,
        id: editId
      })

      if(data.statusCode === 1200){
        getAllProjects(1)
        dispatch(changeGlobalMessage({ type:'success', message: data?.data}))
        setIsModalOpen(false)
        form.resetFields()
      }else{
        dispatch(changeGlobalMessage({ type:'error', message: data?.data || '服务器异常，请稍后重试' }))
      }
    })
  }

  const onCancel = () =>{
    setIsModalOpen(false)
    form.resetFields()
  }

  const deleteOneProject = async (e: any, id: number) =>{
    e.stopPropagation()
    const { data } =  await deleteProject(id)

    if(data.statusCode === 1200){
      getAllProjects(currentPage)
      dispatch(changeGlobalMessage({ type:'success', message: data?.data}))
    }else{
      dispatch(changeGlobalMessage({ type:'error', message: data?.data || '服务器异常，请稍后重试' }))
    }
  }

  const searchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
    if(!value){
      // 这里待定，等搜索的分页做出来
      getAllProjects(1)
    }else{
      const { data } = await searchProject(value)
      setListData(data.data)
    }
  }

  const editModal = (e: any, item: any) => {
    e.stopPropagation()
    
    setModalType('edit')
    form.setFieldsValue(item)
    setEditId(item.id)
    setIsModalOpen(true)
  }

  const clickCard = () =>{
    console.log('123');
  }

  const pageChange: PaginationProps['onShowSizeChange'] = (current, _) => {
    getAllProjects(current)
  };

  return (
    <ProjectCollectionStyled>
      <Modal title={ modalType === 'create' ? '创建应用' : '编辑应用'} 
      open={isModalOpen} onOk={onOk} cancelText='取消'
      onCancel={onCancel} okText={ modalType === 'create' ? '创建' : '更新'} 
      >
        <Form name="project" labelCol={{ span: 4 }} form={form}>
          <Form.Item<FieldType>
            label="应用名称"
            name="projectName"
            rules={[{ required: true, message: '请输入应用名称' }]}
          >
            <Input maxLength={10} showCount />
          </Form.Item>

          <Form.Item<FieldType>
            label="应用描述"
            name="projectDesc"
          >
            <Input.TextArea maxLength={99} showCount style={{height:'100px'}}/>
          </Form.Item>

          <Form.Item<FieldType>
            name="projectType"
            label="应用类型"
            rules={[{ required: true, message: '请选择应用类型' }]}
          >
            <Select placeholder="请选择应用类型">
              {
                typeData.map(item =>{
                  return <Option value={item} key={item}>{typeTextMap[item as keyof typeof typeTextMap]}</Option>
                })
              }
            </Select>
          </Form.Item>

          {
            modalType === 'edit' && (
              <Form.Item<FieldType> label="项目状态" name="projectState">
                <Radio.Group>
                  {
                    stateData.map(item =>{
                      return <Radio.Button value={item} key={item}>{stateTextMap[item as keyof typeof stateTextMap]}</Radio.Button>
                    })
                  }
                </Radio.Group>
              </Form.Item>
            )
          }
          

        </Form>
      </Modal>

      <div className='top'>
        <Input prefix={<SearchOutlined />} placeholder='请输入应用名称' 
        allowClear value={searchValue} onChange={e => searchChange(e)} />
        <Button type='primary' onClick={()=> {setModalType('create');setIsModalOpen(true)}}>创建应用</Button>
      </div>


      <div className='content'>
        <Row gutter={[16, 16]}>
          {
            listData.map(item =>{
              return (
                <Col span={6} key={item.id}>
                  <Card
                    actions={[
                      <CopyOutlined key="copy" onClick={ (e)=> {e.stopPropagation()} }/>,
                      <EditOutlined key="edit" onClick={ (e)=> {editModal(e, item)} } />,
                      <Popconfirm
                        title="提示"
                        description="确定要删除该项目吗"
                        onConfirm={(e)=>{deleteOneProject(e, item.id)}}
                        onCancel={ (e)=> {e?.stopPropagation()} }
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined key="delete" onClick={ (e)=> {e.stopPropagation()} }/>
                      </Popconfirm>,
                    ]}
                    hoverable
                    onClick={clickCard}
                  >
                    <Meta
                      avatar={<Avatar src={getImageShow(item.projectIcon)} />}
                      title={item.projectName}
                      description={
                        <div className='otherinfo'>
                          <div>{item.projectDesc}</div>
                          <div className='typestate'>
                            {/* @ts-ignore */}
                            <span className='type'>{typeTextMap[item.projectType]}</span>
                            {/* @ts-ignore */}
                            <Tag color={stateTextColor[item.projectState]}>{stateTextMap[item.projectState]}</Tag>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              )
            })
          }
        </Row>
        
      </div>

      <div className='bottom'>
        <ConfigProvider locale={zhCN}>
          <Pagination showQuickJumper defaultCurrent={currentPage} 
          defaultPageSize={8} total={totalPage} showSizeChanger={false}
          onChange={pageChange}/>
        </ConfigProvider>
      </div>
    </ProjectCollectionStyled>
  )
})