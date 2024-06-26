import { memo } from 'react'
import Header from '@/components/Header/index.tsx'

export default memo(() => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <section>
        2
      </section>
      <footer>
        1
      </footer>
    </div>
  )
})