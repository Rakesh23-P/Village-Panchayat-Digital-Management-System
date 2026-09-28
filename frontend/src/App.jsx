import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import VillageInfoPublic from './pages/VillageInfoPublic';
import SchemesPublic from './pages/SchemesPublic';
import NoticesPublic from './pages/NoticesPublic';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Citizen Pages
import CitizenDashboard from './pages/CitizenDashboard';
import MyProfile from './pages/MyProfile';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageCitizens from './pages/ManageCitizens';
import ManageStaff from './pages/ManageStaff';
import ManageComplaints from './pages/ManageComplaints';
import ManageSchemes from './pages/ManageSchemes';
import ManageNotices from './pages/ManageNotices';
import ManageVillageInfo from './pages/ManageVillageInfo';
import AdminReports from './pages/AdminReports';

// Staff Pages
import StaffDashboard from './pages/StaffDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/village-info" element={<VillageInfoPublic />} />
              <Route path="/schemes" element={<SchemesPublic />} />
              <Route path="/notices" element={<NoticesPublic />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Citizen Protected Routes */}
              <Route path="/citizen/dashboard" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <CitizenDashboard />
                </ProtectedRoute>
              } />
              <Route path="/citizen/profile" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <MyProfile />
                </ProtectedRoute>
              } />
              <Route path="/citizen/submit-complaint" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <SubmitComplaint />
                </ProtectedRoute>
              } />
              <Route path="/citizen/my-complaints" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <MyComplaints />
                </ProtectedRoute>
              } />

              {/* Admin Protected Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/citizens" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageCitizens />
                </ProtectedRoute>
              } />
              <Route path="/admin/staff" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageStaff />
                </ProtectedRoute>
              } />
              <Route path="/admin/complaints" element={
                <ProtectedRoute allowedRoles={['admin', 'staff']}>
                  <ManageComplaints />
                </ProtectedRoute>
              } />
              <Route path="/admin/schemes" element={
                <ProtectedRoute allowedRoles={['admin', 'staff']}>
                  <ManageSchemes />
                </ProtectedRoute>
              } />
              <Route path="/admin/notices" element={
                <ProtectedRoute allowedRoles={['admin', 'staff']}>
                  <ManageNotices />
                </ProtectedRoute>
              } />
              <Route path="/admin/village" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageVillageInfo />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </ProtectedRoute>
              } />

              {/* Staff Protected Routes */}
              <Route path="/staff/dashboard" element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <StaffDashboard />
                </ProtectedRoute>
              } />
              <Route path="/staff/complaints" element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <ManageComplaints />
                </ProtectedRoute>
              } />
              <Route path="/staff/citizens" element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <ManageCitizens />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={
                <div className="container py-5 text-center">
                  <h2 className="text-primary fw-bold">404 - Page Not Found</h2>
                  <p className="text-muted">The requested page was not found on the Village Panchayat Portal.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
