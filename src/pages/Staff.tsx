
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Staff = () => {
  const { user } = useAuth();

  if (user?.role !== 'super_admin') {
    return (
      <AppLayout title="Staff Management">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-red-600">Access Restricted</CardTitle>
              <CardDescription>Staff Management is only available for Super Admins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You do not have permission to access staff management features.
                This section is restricted to Super Admin users only.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Staff Management">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-blue-50">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Staff Management - Add/Edit Workers</h1>
            <p className="text-muted-foreground">Complete staff management and administration</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Staff management features for Super Admins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Add new staff members',
                'Edit staff profiles',
                'Manage user roles',
                'Staff performance tracking',
                'Access control management',
                'Staff scheduling'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <UserPlus className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Staff management features are under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Complete staff management system with role assignments, performance tracking, and access controls.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Staff;
