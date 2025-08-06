
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  const getSettingsContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          title: 'Settings - Platform-wide & Personal',
          description: 'Complete system and personal settings',
          features: ['Platform-wide settings', 'System configuration', 'User management settings', 'Security settings', 'Personal preferences', 'Notification settings']
        };
      default:
        return {
          title: 'Settings - Personal Settings',
          description: 'Manage your personal account settings',
          features: ['Personal preferences', 'Account settings', 'Password management', 'Notification preferences', 'Profile settings']
        };
    }
  };

  const content = getSettingsContent();

  return (
    <AppLayout title="Settings">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gray-50">
            <SettingsIcon className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {user?.role === 'super_admin' ? (
                <Globe className="h-5 w-5 text-gray-600" />
              ) : (
                <User className="h-5 w-5 text-gray-600" />
              )}
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Settings available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <SettingsIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Settings management features are under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Comprehensive settings management with role-based access and system configuration options.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
