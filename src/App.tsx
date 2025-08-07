
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ParticipantManagement from './pages/ParticipantManagement';
import Staff from './pages/Staff';
import ShiftLogs from './pages/ShiftLogs';
import InvoiceCenter from './pages/InvoiceCenter';
import NDISItemCodes from './pages/NDISItemCodes';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ParticipantProfile from './pages/ParticipantProfile';
import SessionLogEntry from './pages/SessionLogEntry';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/participants" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_coordinator', 'allied_health']}>
              <ParticipantManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/participants/:id" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_coordinator', 'allied_health']}>
              <ParticipantProfile />
            </ProtectedRoute>
          } />
          
          <Route path="/staff" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Staff />
            </ProtectedRoute>
          } />
          
          <Route path="/shift-logs" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_worker', 'allied_health']}>
              <ShiftLogs />
            </ProtectedRoute>
          } />
          
          <Route path="/sessions/new" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_worker', 'allied_health']}>
              <SessionLogEntry />
            </ProtectedRoute>
          } />
          
          <Route path="/invoice-center" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_coordinator']}>
              <InvoiceCenter />
            </ProtectedRoute>
          } />
          
          <Route path="/ndis-codes" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <NDISItemCodes />
            </ProtectedRoute>
          } />
          
          <Route path="/documents" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_coordinator', 'allied_health']}>
              <Documents />
            </ProtectedRoute>
          } />
          
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={['super_admin', 'support_coordinator']}>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
