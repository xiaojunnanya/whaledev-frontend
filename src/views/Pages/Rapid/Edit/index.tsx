import { memo, useEffect, useState } from 'react'
import { EditPagesStyle } from './style'
import Content from './Content'
import { Button, InputNumber } from 'antd'
import { getPageInfoById } from '@/service/modules/pages'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'

import computerImg from '@/assets/images/png/computer.png'
import flatImg from '@/assets/images/png/flat.png'
import phoneImg from '@/assets/images/png/phone.png'
import { useGlobal } from '@/stores/global'

interface pageType{
    id: number,
    pageName: string,
    pageType: string
}

export default memo(() => {
    const params = useParams()
    const navigate = useNavigate()
    const { projectId = '', pageId = '' } = params
    const [ pageInfo, setPageInfo ] = useState<pageType>({} as pageType)
    const { width: viewWidth } = useGlobal()

    useEffect(()=>{
        getPageInfo()
    }, [])

    const getPageInfo = async () => {
        // 获取页面信息
        const { data } =  await getPageInfoById(pageId)
        setPageInfo(data.data)
    }

    const preview = () =>{
        window.open(`/project/${projectId}/preview/page/${pageId}`)
    }

  return (
    <EditPagesStyle>
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
                <Button size='small'>重置</Button>
                <Button type='primary' size='small'>保存</Button>
                <Button size='small' onClick={preview}>预览</Button>
            </div>
        </div>

        <Content/>
    </EditPagesStyle>
  )
})