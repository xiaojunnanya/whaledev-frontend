import { memo, useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ProjectCollectionStyled } from './style'
import { Avatar, Button, Card, Col, Form, Input, Modal, Pagination, Popconfirm, Radio, Row, Select, Tag } from 'antd'
import type { PaginationProps } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { createProject, deleteProject, getProject, getProjectState, getProjectStateColor, getProjectType, updateProject } from '@/service/modules/project';
import { getImageShow } from '@/service/modules/common'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '@/store/global'

const { Meta } = Card;
const { Option } = Select

interface FieldType {
  projectName: string;
  projectDesc?: string;
  projectType: string;
  projectState: 'inProgress' | 'completed' | 'paused' | 'obsolete'
};

interface projectDataType extends FieldType{
  id: number,
  projectId:string,
  projectIcon:string,
}

// 搜索防抖
export default memo(() => {
  const [form] = Form.useForm()
  const { setMessage } = useMessage()
  const navigate = useNavigate()


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ modalType, setModalType ] = useState<'create' | 'edit'>('create')
  const [ listData, setListData ] = useState<projectDataType[]>([])
  const [ searchValue, setSearchValue ] = useState('')
  const [ editId, setEditId ] = useState<number>(-1)
  // 卡片加载
  const [ cardLoading, setCardLoading ] = useState(false)
  // 分页相关
  const [ pageConfig, setPageConfig ] = useState({ 
    total: 0,
    current: 1
  })

  // 项目配置相关
  const [ projectConfig, setProjectConfig ] = useState<any>({
    projectType: {},
    projectState: {},
    projectStateColor: {}
  })

  const typeData = useMemo(()=> Object.keys(projectConfig.projectType), [projectConfig.projectType])
  const stateData = useMemo(()=> Object.keys(projectConfig.projectState), [projectConfig.projectState])

  useEffect(()=>{
    getAllProjects(1)

    getConfig()

  }, [])

  // 项目配置
  const getConfig = () =>{
    const project_type = new Promise((resolve, _)=>{
      getProjectType().then(res=>{
        resolve(res.data.data)
      })
    })

    const project_state = new Promise((resolve, _)=>{
      getProjectState().then(res=>{
        resolve(res.data.data)
      })
    })

    const project_state_color = new Promise((resolve, _)=>{
      getProjectStateColor().then(res=>{
        resolve(res.data.data)
      })
    })

    Promise.all([project_type, project_state, project_state_color]).then(([project_type, project_state, project_state_color])=>{
      setProjectConfig({
        projectType: project_type,
        projectState: project_state,
        projectStateColor: project_state_color
      })
    })
  }


  const getAllProjects = async (page: number, projectName?: string) => {
    setCardLoading(true)
    const { data } = await getProject(page, projectName)
    setListData(data.data)
    setPageConfig({ total: data.total, current: data.page })

    // 当前页最后一个删除的时候跳转到前一页
    if( data.data.length === 0 && page > 1 ){
      getAllProjects(data.page - 1)
    }

    setCardLoading(false)
  }

  const onOk = () => {
    form.validateFields().then(async (res) =>{

      const { data } = modalType === 'create' ? await createProject(res) : await updateProject({
        ...res,
        id: editId
      })

      if(data.statusCode === 1200){
        getAllProjects(modalType === 'create' ? 1 : pageConfig.current)
        setMessage({ type:'success', text: data?.data})
        setIsModalOpen(false)
        form.resetFields()
      }else{
        setMessage({ type:'error', text: data?.data || '服务器异常，请稍后重试'})
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
      getAllProjects(pageConfig.current)
      setMessage({ type:'success', text: data?.data})
    }else{
      setMessage({ type:'error', text: data?.data || '服务器异常，请稍后重试'})
    }
  }

  const searchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)

    // 对这行做防抖，拿到最新的value和1秒前的value对比，相等调用，不相等重置1秒
    getAllProjects(1, value)

  }

  const editModal = (e: any, item: any) => {
    e.stopPropagation()
    
    setModalType('edit')
    form.setFieldsValue(item)
    setEditId(item.id)
    setIsModalOpen(true)
  }

  const goProjectDetail = (projectId: string) =>{
    navigate(`/project/${projectId}/rapid`)
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
                  return <Option value={item} key={item}>{projectConfig.projectType[item]}</Option>
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
                      return <Radio.Button value={item} key={item}>{projectConfig.projectState[item]}</Radio.Button>
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
                    onClick={() =>{ goProjectDetail(item.projectId)}}
                    loading={cardLoading}
                  >
                    <Meta
                      avatar={<Avatar src={getImageShow(item.projectIcon)} />}
                      title={item.projectName}
                      description={
                        <div className='otherinfo'>
                          <div>{item.projectDesc}</div>
                          <div className='typestate'>
                            <span className='type'>{projectConfig.projectType[item.projectType]}</span>
                            <Tag color={projectConfig.projectStateColor[item.projectState]}>{projectConfig.projectState[item.projectState]}</Tag>
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
        <Pagination showQuickJumper current={pageConfig.current} showTotal={(total) => `共 ${total} 条`}
        defaultPageSize={8} total={pageConfig.total} showSizeChanger={false}
        onChange={pageChange}/>
      </div>
    </ProjectCollectionStyled>
  )
})