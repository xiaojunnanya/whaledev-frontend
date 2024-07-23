import { memo } from 'react'
import { HomeStyled } from './style'
import { Button } from 'antd'
import backVideo from '@/assets/video/background.mp4'
import { changeGlobalMessage } from '@/store/modules/global'
import { useAppDispatch } from '@/store'
import { useNavigate } from 'react-router-dom'

export default memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  

  const use = () =>{
    const token = localStorage.getItem('token')
    if(!token){
      dispatch(changeGlobalMessage({ type:'warning', message: '请先登录'}))
      return
    }

    navigate('/project')
  }

  return (
    <section>
      <HomeStyled>
        <div className="video-box">
          <video className="video-background" preload="auto" loop src={backVideo} autoPlay muted={true}></video>
          <div className='midVideo'>
            <div className='title'>鲸灵开发</div>
            <div className='subtitle'>非LowCode，鲸落低代码研发平台</div>
            <div className='btn'>
              <Button type='primary' size='large' onClick={use}>立即使用</Button>
              <Button size='large'>体验Demo</Button>
            </div>
          </div>
        </div>
      </HomeStyled>
    </section>
  )
})