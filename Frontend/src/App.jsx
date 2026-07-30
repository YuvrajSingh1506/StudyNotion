import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/common/NavBar';
import ForgotPassword from './pages/ForgotPassword';
import Error from './pages/Error';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './components/Core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Core/Auth/ProtectRoute';
import EnrolledCourses from './components/Core/Dashboard/EnrolledCourses';
import Cart from './components/Core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constant';
import { useSelector } from 'react-redux';
import Contact from './pages/Contact';
import AddCourse from './components/Core/Dashboard/AddCourse';
import MyCourses from './components/Core/Dashboard/MyCourses';
import EditCourse from './components/Core/Dashboard/Edit Course';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/Core/ViewCourse/VideoDetails';
import Instructor from './components/Core/Dashboard/InstructorDashboard/Instructor';
function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <NavBar/>
      <Routes>
          <Route path = "/" element ={<Home/>}/>
          <Route path = "/login" element={
            // <OpenRoute> 
              <Login/>
            // {/* </OpenRoute> */}
          }/>
          <Route path = "/signup" element ={
            //  <OpenRoute> 
              <SignUp/>
            // </OpenRoute>
          }/>
          <Route path = "*" element={<Error/>}/>
          <Route path = "/forgot-password" element={
            // <OpenRoute>
              <ForgotPassword/>
            // </OpenRoute>
          }/>
          <Route path= "update-password/:id" element={
            <UpdatePassword/>
          }/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path = "/about" element= {<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path = "/dashboard" element={
            <PrivateRoute>
              <Dashboard/> 
            </PrivateRoute>
          }>  
              <Route index element ={<Navigate to="*"/>}/>
              <Route path ="my-profile" element={<MyProfile/>}/>
              <Route path="setting" element={<div>Setting</div>}/>
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path ="enrolled-courses" element = {<EnrolledCourses/>}/>
                    <Route path = "cart" element={<Cart/>}/>
                  </>
                )
              }
             {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                    <Route path="instructor" element = {<Instructor/>}/>
                    <Route path ="add-course" element = {<AddCourse/>}/>
                    <Route path ="my-courses" element = {<MyCourses/>}/>
                    <Route path = "edit-course/:id" element = {<EditCourse/>}/>
                  </>
                )
              }
          </Route>
          <Route path ={"/catalog/:catalogName"} element={<Catalog/>}/>
          <Route path="course/:courseId" element={<CourseDetails/>} />
          <Route path="/view-course/:courseId"
            element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>
            }>
            <Route index element={<Navigate to="*"/>}/>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT &&(
                <>
                  <Route path="section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>}/> 
                </>
               ) 
            }
          </Route>
      </Routes>
    </div>
  )
}

export default App;
