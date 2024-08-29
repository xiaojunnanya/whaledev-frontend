import { memo, useEffect, useState } from 'react'
import { RapidPagesStyle } from './style'
import { Button, Dropdown, Form, Input, Modal, Select } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined, SignatureOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createPage, deletePage, getPage, updatePage } from '@/service/modules/pages';
import { useMessage } from '@/stores/global';
import '@/assets/css/scrollbar.css'

const { Option } = Select

interface pageDataType{
  id: number,
  pageId: string,
  pageName: string,
  pageType: string
}

const settingItems: MenuProps['items'] = [
  {
    key: '1',
    label: ( <span> 编辑 </span> ),
    icon: <EditOutlined />,
    style:{ fontSize: '12px' },
  },
  {
    key: '2',
    label: ( <span> 重命名 </span> ),
    icon: <SignatureOutlined />,
    style:{ fontSize: '12px' }
  },
  {
    key: '3',
    label: ( <span> 复制 </span> ),
    icon: <CopyOutlined />,
    style:{ fontSize: '12px' }
  },
  {
    key: '4',
    label: ( <span> 删除 </span> ),
    icon: <DeleteOutlined />,
    style:{ fontSize: '12px' }
  },
]

const addItems = [
  {
    key: 'custom',
    value: '自定义页面',
  },
  {
    key: 'screen',
    value: '大屏页面',
  },
  {
    key: 'service',
    value: '服务编排',
  },
];

export default memo(() => {
  const params = useParams()
  const { projectId = '', pageId = '' } = params
  const { setMessage } = useMessage()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [ pageActive,  setPageActive ] = useState(pageId)
  const [ modalType, setModalType ] = useState<'create' | 'edit'>('create')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [ pageData, setPageData ] = useState<pageDataType[]>([])
  const [ editPage, setEditPage ] = useState<pageDataType>({} as pageDataType)
  const [ deleteModal, contextDeleteHolder ] = Modal.useModal();

  
  useEffect (() => {
    getAllPages()
  }, [])

  const getAllPages = async () =>{
    const { data } = await getPage(projectId || '')
    setPageData(data.data)
  }

  const handlePageClick = (pageId: string) => {
    setPageActive(pageId)
    navigate(`/project/${projectId}/rapid/page/${pageId}`)
  }

  const onCancel = () =>{
    setIsModalOpen(false)
    form.resetFields()
  }

  const onOk = () => {
    form.validateFields().then(async (res) =>{
      res = {
        ...res,
        projectId
      }
      
      const { data } = modalType === 'create' ? await createPage(res) : await updatePage({
        pageId: editPage.pageId,
        pageName: res.pageName
      })

      if(data.statusCode === 1200){
        getAllPages()
        setMessage({type:'success', text: data?.data})
        setIsModalOpen(false)
        form.resetFields()
      }else{
        setMessage({type:'error', text: data?.data || '服务器异常，请稍后重试' })
      }
    })
  }

  const handleClick = async (e: any, item: pageDataType) =>{
    e.domEvent.stopPropagation()

    setEditPage(item)
    
    switch (e.key) {
      case '1': 
        navigate(`/project/${projectId}/edit/page/${item.pageId}`)
        break;
      case '2':
        setModalType('edit')
        setIsModalOpen(true)
        form.setFieldsValue(item)
        break;
      case '4':
        await deleteModal.confirm({
          title: '提示',
          content: (
            <>
            确定要删除页面 <span style={{color: 'red'}}>{item.pageName}</span> 吗？
            </>
          ),
          onOk: async ()=>{
            const { data } = await deletePage(item.pageId)
            if(data.statusCode === 1200){
              // 这个删除后的应用怎么做处理
              navigate(`/project/${projectId}/rapid`)
              setPageActive('')
              getAllPages()
              setMessage({type:'success', text: data?.data})
            }else{
              setMessage({type:'error', text: data?.data || '服务器异常，请稍后重试' })
            }
          }
        })
        break;
      default: break;
    }
    
  }

  return (
    <RapidPagesStyle>
      <Modal title={ modalType === 'create' ? '新建页面' : '编辑页面'} 
      open={isModalOpen} onOk={onOk} cancelText='取消'
      onCancel={onCancel} okText={ modalType === 'create' ? '创建' : '更新'} 
      >
        <Form name="project" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="页面名称"
            name="pageName"
            rules={[{ required: true, message: '请输入页面名称' }]}
          >
            <Input maxLength={10} showCount />
          </Form.Item>

          <Form.Item
            name="pageType"
            label="页面模式"
            rules={[{ required: true, message: '请选择页面模式' }]}
          >
            <Select placeholder="请选择页面模式" disabled={modalType === 'edit'}>
              {
                addItems.map(item =>{
                  return <Option value={item.key} key={item.key}>{item.value}</Option>
                })
              }
            </Select>
          </Form.Item>

        </Form>
      </Modal>

            
      {
        contextDeleteHolder
      }


      <div className='page-select'>
        <div className='add'>
          <div className='add-text'>广告位招租</div>
          <Button type="primary" size='small' shape="circle" 
          icon={<PlusOutlined />} onClick={()=>{setIsModalOpen(true);setModalType('create')}}/>
        </div>
        <div className='page'>
          {
            pageData.map((item) => {
              return (
                <div className={`page-item ${ item.pageId === pageActive ? 'page-active' : ''}`} 
                  onClick={() => handlePageClick(item.pageId)}
                  key={item.id}>
                  <div className='page-item-name'>
                    <span>{ item.pageName }</span>
                    {/* 待添加的功能：展示标签，不知道展示在哪 */}
                    {/* <Tag color="cyan">自定义页面</Tag> */}
                  </div>
                  <Dropdown menu={{ items: settingItems, onClick: (e) => {handleClick(e, item)} }} arrow={{ pointAtCenter: true }}>
                    <SettingOutlined className='settingOutlined'/>
                  </Dropdown>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='page-preview'>
        {
          pageActive ? <div>{ pageActive }</div> : <div>请选择页面</div>
        }
      </div>
    </RapidPagesStyle>
  )
})