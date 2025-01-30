import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CommissionerLogin from './pages/CommissionerLogin'
import Dashboard from './pages/commissioner/Dashboard'
import Departments from './pages/commissioner/Departments'
import DepartmentAdmins from './pages/commissioner/DepartmentAdmins'
import DepartmentDetails from './pages/commissioner/DepartmentDetails'
import DeptAdminLayout from './pages/departmentAdmin/DeptAdminLayout'
import DeptAdminDashboard from './pages/departmentAdmin/DeptAdminDashboard'
import AllComplaints from './pages/departmentAdmin/AllComplaints'
import ComplaintDetails from './pages/departmentAdmin/ComplaintDetails'
import Notifications from './pages/departmentAdmin/Notifications'
import DeptAdminLogin from './pages/departmentAdmin/DeptAdminLogin'
import { Toaster } from 'react-hot-toast'
import CommissionerLayout from './pages/commissioner/CommissionerLayout'
import { AuthProvider } from './context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from './config/firebase'

const App = () => {
  // useEffect(() => {
  //   signOut(auth);
  // }, []);
  return (
    
    <AuthProvider>
      <Router>
        <Toaster position='top-right' reverseOrder={false} />
        <div className="text-neutral">
          <Routes>
            {/* Public routes with Navbar */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Outlet />
                </>
              }
            >
              {/* Add your public routes here */}
              <Route index element={<HomePage />} />
            </Route>

            {/* Auth routes without Navbar */}
            <Route
              path="/commissioner/login"
              element={
                <PublicRoute>
                  <CommissionerLogin />
                </PublicRoute>
              }
            />

            {/* Protected dashboard routes without Navbar */}
            <Route
              path="/commissioner/dashboard"
              element={
                <ProtectedRoute allowedRoles={['commissioner']}>
                  <CommissionerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="departments" element={<Departments />} />
              <Route path="departments/:id" element={<DepartmentDetails />} />
              <Route path="admins" element={<DepartmentAdmins />} />
            </Route>

            {/* Department Admin Routes */}
            <Route path="/department-admin/login" element={
              <PublicRoute>
                <DeptAdminLogin />
              </PublicRoute>
            } />
            
            <Route path="/department-admin" element={
              <ProtectedRoute allowedRoles={['deptAdmin']}>
                <DeptAdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<DeptAdminDashboard />} />
              <Route path="complaints" element={<AllComplaints />} />
              <Route path="complaints/:id" element={<ComplaintDetails />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/commissioner/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App