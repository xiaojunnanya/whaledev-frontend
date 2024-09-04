import { memo, useEffect, useState } from 'react'
import { EditPagesStyle } from './style'
import Content from './Content'
import { Button, InputNumber, Modal } from 'antd'
import { getPageInfoById, getPageJsonById, saveJson } from '@/service/modules/pages'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'

import computerImg from '@/assets/images/png/computer.png'
import flatImg from '@/assets/images/png/flat.png'
import phoneImg from '@/assets/images/png/phone.png'
import { useGlobal } from '@/stores/global'
import { useComponetsStore } from '@/stores/components'

interface pageType{
    id: number,
    pageName: string,
    pageType: string
}

export default memo(() => {
    const { components, updeteComponent } = useComponetsStore()
    const params = useParams()
    const navigate = useNavigate()
    const { projectId = '', pageId = '' } = params
    const [ pageInfo, setPageInfo ] = useState<pageType>({} as pageType)
    const { width: viewWidth, setMessage } = useGlobal()
    const [ showResetModal, setShowResetModal ] = useState(false)

    useEffect(()=>{
        getPageJson()
        getPageInfo()
    }, [])

    const getPageInfo = async () => {
        // 获取页面信息
        const { data } =  await getPageInfoById(pageId)
        setPageInfo(data.data)
    }

    const getPageJson = async () => {
        // 获取页面信息
        const { data } =  await getPageJsonById(projectId, pageId)
        if(data?.data?.pageJson){
            updeteComponent(JSON.parse(data.data.pageJson))
        }
    }

    const preview = () =>{
        window.open(`/project/${projectId}/preview/page/${pageId}`)
    }

    const save = async () =>{
        // 保存页面
        const { data } = await saveJson({ pageId, projectId, pageJson: JSON.stringify(components) })

        if(data.statusCode === 1200){
            setMessage({type:'success', text: data?.data})
          }else{
            setMessage({type:'error', text: data?.data || '服务器异常，请稍后重试' })
          }
    }

    const reset = () =>{
        // 重置页面
        updeteComponent([
            {
                id: '0',
                name: 'Page',
                props: {},
                desc: '页面',
                children: []
            }
        ])
        setShowResetModal(false)
    }


  return (
    <EditPagesStyle>
        
        <Modal title="提示" open={showResetModal} onOk={reset} 
        onCancel={()=> setShowResetModal(false) }>
            你确定要重置该页面吗
        </Modal>


        <div className="edit-top">
            <div className='edit-top-left'>
                <LeftOutlined onClick={()=>{navigate(`/project/${projectId}/rapid/page/${pageId}`)}}/>
                <span className='page-name'>{ pageInfo.pageName }</span>
            </div>
            <div className='edit-top-middle'>
                <img src={computerImg} alt="电脑" />
                <img src={flatImg} alt="平板" />
                <img src={phoneImg} alt="手机" />
                <InputNumber addonAfter="px" value={viewWidth}/>
            </div>
            <div className='edit-top-right'>
                <Button size='small' onClick={()=> setShowResetModal(true) }>重置</Button>
                <Button type='primary' size='small' onClick={save}>保存</Button>
                <Button size='small' onClick={preview}>预览</Button>
            </div>
        </div>

        <Content/>
    </EditPagesStyle>
  )
})