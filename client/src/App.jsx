import './App.css'
import Footer from './component/Footer'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>
      </Routes>
    </>
  )
}

export default App
