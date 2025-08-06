
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SuperAdminDashboard from './SuperAdminDashboard';
import SupportWorkerDashboard from './SupportWorkerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'support_worker':
      return <SupportWorkerDashboard />;
    case 'support_coordinator':
      return <SuperAdminDashboard />; // Will create specific dashboard later
    case 'allied_health':
      return <SuperAdminDashboard />; // Will create specific dashboard later
    default:
      return <SuperAdminDashboard />;
  }
};

export default Dashboard;
