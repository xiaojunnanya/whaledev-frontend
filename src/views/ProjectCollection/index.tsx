import { memo, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ProjectCollectionStyled } from './style'
import { Avatar, Button, Card, Col, Form, Input, Modal, Popconfirm, Radio, Row, Select, Tag } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { createProject, deleteProject, getProject, updateProject } from '@/service/modules/project';
import { useAppDispatch } from '@/store';
import { changeGlobalMessage } from '@/store/modules/global';
import { getImageShow } from '@/service/modules/common'

const { Meta } = Card;
const { Option } = Select

enum projectTypeType {
  one,
  two,
  other,
}
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


export default memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ modalType, setModalType ] = useState<'create' | 'edit'>('create')
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [ listData, setListData ] = useState<projectDataType[]>([
    {
      id: 1,
      projectId: '001',
      projectIcon: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      projectName: '项目1',
      projectDesc: '项目1描述',
      projectType: '项目类型1',
      projectState: projectStateType.inProgress
    }
  ])
  const [ searchValue, setSearchValue ] = useState('')
  const [ editId, setEditId ] = useState<number>(-1)
  const [ loadingData, setLoadingData ] = useState(true)


  useEffect(()=>{
    getAllProjects()
  }, [])


  const getAllProjects = async () => {
    const { data } = await getProject()
    setListData(data.data)
    setLoadingData(false)
  }

  const onOk = () => {
    form.validateFields().then(async (res) =>{

      const { data } = modalType === 'create' ? await createProject(res) : await updateProject({
        ...res,
        id: editId
      })

      if(data.statusCode === 1200){
        getAllProjects()
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

  const deleteOneProject = async (id: number) =>{
    
    const { data } =  await deleteProject(id)

    if(data.statusCode === 1200){
      getAllProjects()
      dispatch(changeGlobalMessage({ type:'success', message: data?.data}))
    }else{
      dispatch(changeGlobalMessage({ type:'error', message: data?.data || '服务器异常，请稍后重试' }))
    }
  }

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }

  const editModal = (e: any) => {
    setModalType('edit')
    form.setFieldsValue(e)
    setEditId(e.id)
    setIsModalOpen(true)
  }

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
            <Input.TextArea maxLength={100} showCount/>
          </Form.Item>

          <Form.Item<FieldType>
            name="projectType"
            label="应用类型"
            rules={[{ required: true, message: '请选择应用类型' }]}
          >
            <Select placeholder="请选择应用类型">
              {
                typeData.map(item =>{
                  return <Option value={item}>{typeTextMap[item as keyof typeof typeTextMap]}</Option>
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
                      return <Radio.Button value={item}>{stateTextMap[item as keyof typeof stateTextMap]}</Radio.Button>
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
                      <CopyOutlined key="copy" />,
                      <EditOutlined key="edit" onClick={ ()=> {editModal(item)} } />,
                      <Popconfirm
                        title="提示"
                        description="确定要删除该项目吗"
                        onConfirm={()=>{deleteOneProject(item.id)}}
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined key="delete"/>
                      </Popconfirm>,
                    ]}
                    hoverable
                    loading={loadingData}
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
    </ProjectCollectionStyled>
  )
})