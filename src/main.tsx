import { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/normalize.css'
import { BrowserRouter } from 'react-router-dom'
import Loading from './components/Loading/index.tsx'
import { Provider } from 'react-redux'
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
