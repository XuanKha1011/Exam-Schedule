import "./App.css"

import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import 'react-toastify/dist/ReactToastify.css'
import Unauthorized from "./pages/Unauthorized"
import Page404 from "./pages/Page404"
import AdminDashboard from "./pages/Admin"
import TeacherDashboard from "./pages/Teacher"
import StudentDashboard from "./pages/Student"
import Room from "./pages/Room"
import CourseDashboard from "./pages/Course"
import ExamscheduleDashboard from "./pages/ExamSchedule"
import MajorDashboard from "./pages/Major"
import SemesterDashboard from "./pages/Semester"
import Profile from "./pages/Profile"
import ExamslotDashboard from "./pages/ExamSlot"
import ProtectedAuth from "./components/ProtectedAuth"
import { makeRoles } from "./utils/common"
import Management from "./components/Layout/Management"
import useAuth from "./hooks/useAuth"
import AlluserDashboard from "./pages/Alluser"
import ReproctoringDashboard from "./pages/Reproctoring"
import ExamscheduleDetails from "./pages/ExamscheduleDetails"

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
    
      <Routes>
        {/* public routes */}
        <Route element={<ProtectedAuth routeProtected={false} />}>
          <Route path="/login" element={<Login />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* we want to protect these routes */}
        <Route
          element={
            <ProtectedAuth allowedRoles={[...makeRoles([1, 2, 3, 4,5])]} />
          }
        >
          <Route path="/" element={<Management />}>
            <Route
              index
              element={
                makeRoles([5, 6, 7, 8, 9, 10, 11, 12]).includes(user?.role) ? (
                  <AdminDashboard />
                ) : (
                  <AdminDashboard />
                )
              }
            />
            
            <Route path="/room" element={<Room />} />
            <Route path="/alluser" element={<AlluserDashboard />} />
            <Route path="/reproctoring" element={<ReproctoringDashboard />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/proctoring" element={<TeacherDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/course" element={<CourseDashboard />} />
            <Route path="/examschedule" element={<ExamscheduleDashboard />} />
            <Route path="/examschedule/:id" element={<ExamscheduleDetails />} />
            <Route path="/major" element={<MajorDashboard />} />
            <Route path="/semester" element={<SemesterDashboard />} />
            <Route path="/examslot" element={<ExamslotDashboard />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Page404 />} />
        {/* </Route> */}
      </Routes>
    </div>
  )
}

export default App
