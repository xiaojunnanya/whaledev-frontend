import { memo, useState } from 'react'
import { ProjectCollectionStyled } from './style'
import { Avatar, Button, Card, Col, Form, Input, Modal, Radio, Row, Select } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { createProject } from '@/service/modules/project';
import { useAppDispatch } from '@/store';
import { changeGlobalMessage } from '@/store/modules/global';
const { Meta } = Card;
const { Option } = Select

const list = [
  { id: 1, title: '十个字标题这就是十个', desc: 'Ant Design Title 1' },
  { id: 2, title: 'Ant Design Title 2', desc: 'Ant Design Title 2' },
  { id: 3, title: 'Ant Design Title 3', desc: 'Ant Design Title 3' },
  { id: 4, title: 'Ant Design Title 4', desc: 'Ant Design Title 4' },
  { id: 5, title: 'Ant Design Title 5', desc: 'Ant Design Title 5' },
  { id: 6, title: 'Ant Design Title 6', desc: 'Ant Design Title 6' },
  { id: 7, title: 'Ant Design Title 7', desc: 'Ant Design Title 7' },
]

type FieldType = {
  projectName?: string;
  projectDesc?: string;
  projectType?: string;
  projectState?: 'inProgress' | 'completed' | 'paused' | 'obsolete'
};

export default memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ modalType, setModalType ] = useState<'create' | 'edit'>('create')
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const onOk = () => {
    form.validateFields().then(async (res) =>{
      const { data } = await createProject(res)

      if(data.statusCode === 1200){
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
    // 至于有没有在取消的时候重置，后面需要思考一下
    form.resetFields()
  }


  const editModal = () => {
    setModalType('edit')
    setIsModalOpen(true)
  }

  return (
    <ProjectCollectionStyled>
      <Modal title={ modalType === 'create' ? '创建应用' : '编辑应用'} 
      open={isModalOpen} onOk={onOk} cancelText='取消' destroyOnClose
      onCancel={onCancel} okText={ modalType === 'create' ? '创建' : '更新'} 
      >
        {/* 应用名称、应用ID（不显示）、应用描述、应用类型，应用状态、
        头像（暂定，不做选择，给默认值：/projectIcon/default-avatar.svg） 
          在创建的时候不需要选择状态吧感觉，可以在编辑的时候选择状态
        */}
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
              <Option value="one">类型1</Option>
              <Option value="two">类型2</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          {
            modalType === 'edit' && (
              <Form.Item<FieldType> label="项目状态" name="projectState">
                <Radio.Group>
                  <Radio.Button value="inProgress">进行中</Radio.Button>
                  <Radio.Button value="completed">已完成</Radio.Button>
                  <Radio.Button value="paused">已暂停</Radio.Button>
                  <Radio.Button value="obsolete">已废弃</Radio.Button>
                </Radio.Group>
              </Form.Item>
            )
          }
          

        </Form>
      </Modal>

      <div className='top'>
        <Input prefix={<SearchOutlined />} placeholder='请输入应用名称'/>
        <Button type='primary' onClick={()=> {setModalType('create');setIsModalOpen(true)}}>创建应用</Button>
      </div>


      <div className='content'>
        <Row gutter={[16, 16]}>
          {
            list.map(item =>{
              return (
                <Col span={6} key={item.id}>
                  <Card
                    actions={[
                      <CopyOutlined key="copy" />,
                      <EditOutlined key="edit" onClick={ ()=> {editModal()} } />,
                      <DeleteOutlined key="delete" />,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                      title={item.title}
                      description={item.desc}
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