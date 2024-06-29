import { memo } from 'react'
import Header from '@/components/Header/index.tsx'
import Footer from '@/components/Footer'
import { HomeStyled } from './style'
import { Button } from 'antd'

export default memo(() => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <section>
        <HomeStyled>
          <Button>立即使用</Button>
          <Button>体验Demo</Button>
        </HomeStyled>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
})