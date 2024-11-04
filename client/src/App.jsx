import './App.css'
import Footer from './component/Footer'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CourseList from './pages/course/CourseList'
import Contact from './pages/Contact'
import Denied from './pages/Denied'
import CourseDescription from './pages/course/CourseDescription'
import RequireAuth from './component/Auth/RequireAuth'
import CreateCourse from './pages/course/CreateCourse'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'
import Checkout from './pages/payment/Checkout'
import CheckoutSuccess from './pages/payment/CheckoutSuccess'
import CheckoutFailure from './pages/payment/CheckoutFailure'
import DisplayLectures from './pages/dashboard/DisplayLectures'
import AddLecture from './pages/dashboard/Addlecture'
import AdminDashboard from './pages/dashboard/AdminDashboard'

function App() {
  

  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutUs />}></Route>
          <Route path='https://learning-management-system-liart.vercel.app//courses' element={<CourseList />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/denied' element={<Denied />}></Route>
          <Route path='/courses/description' element={<CourseDescription />}></Route>

          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>

          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/courses/create' element={<CreateCourse />}></Route>
          <Route path='/courses/addlecture' element={<AddLecture />}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
            <Route path='/user/profile' element={<Profile />}></Route>
            <Route path='/user/editprofile' element={<EditProfile />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/checkout/success' element={<CheckoutSuccess />}></Route>
            <Route path='/checkout/fail' element={<CheckoutFailure />}></Route>
            <Route path='/course/displaylectures' element={<DisplayLectures />}></Route>
          </Route>

          <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
