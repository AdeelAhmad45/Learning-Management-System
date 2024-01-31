import './App.css'
import Footer from './component/Footer'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>

          <Route path='/signup' element={<Signup />}></Route>

          <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
