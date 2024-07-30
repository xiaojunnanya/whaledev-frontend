import { getProjectDetail } from '@/service/modules/project'
import { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PreviewPagesStyled } from './style'
import { Tabs } from 'antd'
import type { TabsProps  } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import RapidPages from '../RapidPages'
import SettingPages from '../SettingPages'


interface ProjectInfoType {
  id: string,
  projectId:string,
  projectName:string,
  projectDesc:string,
  projectState:string,
  projectType:string,
  projectIcon:string,
}



export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  
  const { projectId, config } = params

  const [ projectInfo, setProjectInfo ] = useState<ProjectInfoType>({} as ProjectInfoType)
  const [tabsActiveKey, setTabsActiveKey] = useState(config || 'rapid');

  useEffect(()=>{
    getProjectInfo()
  }, [])
  
  const getProjectInfo = async () =>{
    const { data } = await getProjectDetail(projectId || '')
    setProjectInfo(data.data)
  }

  const onChange = (key: string) => {
    setTabsActiveKey(key);
    navigate(`/project/${projectId}/${key}`)
  };
  
  const items: TabsProps['items'] = [
    {
      key: 'rapid',
      label: '应用组装',
      children: <RapidPages />,
    },
    {
      key: 'settings',
      label: '应用设置',
      children: <SettingPages />,
    },
  ];

  return (
    <PreviewPagesStyled>
      <div className='header'>
        <div className='project-name'>
          <LeftOutlined onClick={()=>{navigate('/project')}}/>
          <span className='project-name-text'>{projectInfo.projectName}</span>
        </div>

        <div className='project-able'>
          <Tabs activeKey={tabsActiveKey} items={items} centered
          onChange={onChange} style={{marginBottom:0}}/>
        </div>

      </div>

    </PreviewPagesStyled>
  )
})