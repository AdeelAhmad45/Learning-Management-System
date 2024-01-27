import './App.css'
import Footer from './component/Footer'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </>
  )
}

export default App
