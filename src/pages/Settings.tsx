
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, User, Globe, Bell, Shield, Users, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface PersonalSettings {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  theme: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  shiftReminders: boolean;
  documentExpiry: boolean;
  invoiceUpdates: boolean;
}

interface SystemSettings {
  organizationName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  defaultTimezone: string;
  currency: string;
  dateFormat: string;
}

interface SecuritySettings {
  sessionTimeout: number;
  passwordExpiry: number;
  twoFactorAuth: boolean;
  loginAttempts: number;
  auditLogging: boolean;
}

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const personalForm = useForm<PersonalSettings>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      timezone: 'Australia/Sydney',
      language: 'en',
      theme: 'light'
    }
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    shiftReminders: true,
    documentExpiry: true,
    invoiceUpdates: false
  });

  const systemForm = useForm<SystemSettings>({
    defaultValues: {
      organizationName: 'NDIS Support Services',
      address: '123 Support Street, Sydney NSW 2000',
      phone: '+61 2 1234 5678',
      email: 'info@ndissupport.com.au',
      website: 'https://ndissupport.com.au',
      logo: '',
      defaultTimezone: 'Australia/Sydney',
      currency: 'AUD',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    sessionTimeout: 30,
    passwordExpiry: 90,
    twoFactorAuth: false,
    loginAttempts: 5,
    auditLogging: true
  });

  const onPersonalSubmit = (data: PersonalSettings) => {
    console.log('Personal settings updated:', data);
    toast.success('Personal settings updated successfully');
  };

  const onSystemSubmit = (data: SystemSettings) => {
    console.log('System settings updated:', data);
    toast.success('System settings updated successfully');
  };

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Notification preferences updated');
  };

  const updateSecuritySetting = (key: keyof SecuritySettings, value: number | boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Security settings updated');
  };

  const getTabs = () => {
    const baseTabs = [
      { id: 'personal', label: 'Personal', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ];

    if (user?.role === 'super_admin') {
      return [
        ...baseTabs,
        { id: 'system', label: 'System', icon: Globe },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'database', label: 'Database', icon: Database }
      ];
    }

    return baseTabs;
  };

  return (
    <AppLayout title="Settings">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gray-50">
            <SettingsIcon className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              {user?.role === 'super_admin' 
                ? 'Manage system-wide and personal settings' 
                : 'Manage your personal account settings'}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            {getTabs().map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Personal Settings */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...personalForm}>
                  <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={personalForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                                <SelectItem value="Australia/Melbourne">Melbourne (AEDT)</SelectItem>
                                <SelectItem value="Australia/Brisbane">Brisbane (AEST)</SelectItem>
                                <SelectItem value="Australia/Perth">Perth (AWST)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to be notified about important events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Shift Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming shifts</p>
                    </div>
                    <Switch
                      checked={notificationSettings.shiftReminders}
                      onCheckedChange={(checked) => updateNotificationSetting('shiftReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Document Expiry Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when documents are about to expire</p>
                    </div>
                    <Switch
                      checked={notificationSettings.documentExpiry}
                      onCheckedChange={(checked) => updateNotificationSetting('documentExpiry', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Invoice Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about invoice status changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.invoiceUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting('invoiceUpdates', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings - Super Admin Only */}
          {user?.role === 'super_admin' && (
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>System Configuration</span>
                  </CardTitle>
                  <CardDescription>Configure organization-wide settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...systemForm}>
                    <form onSubmit={systemForm.handleSubmit(onSystemSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={systemForm.control}
                          name="organizationName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Phone</FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input {...field} type="url" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="defaultTimezone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Timezone</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select timezone" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                                  <SelectItem value="Australia/Melbourne">Melbourne (AEDT)</SelectItem>
                                  <SelectItem value="Australia/Brisbane">Brisbane (AEST)</SelectItem>
                                  <SelectItem value="Australia/Perth">Perth (AWST)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                  <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={systemForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button type="submit">Save System Settings</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Security Settings - Super Admin Only */}
          {user?.role === 'super_admin' && (
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>Configure security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
                      />
                      <p className="text-sm text-muted-foreground">
                        Automatically log out users after this period of inactivity
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Password Expiry (days)</Label>
                      <Input
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => updateSecuritySetting('passwordExpiry', parseInt(e.target.value))}
                      />
                      <p className="text-sm text-muted-foreground">
                        Force users to change passwords after this period
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Maximum Login Attempts</Label>
                      <Input
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => updateSecuritySetting('loginAttempts', parseInt(e.target.value))}
                      />
                      <p className="text-sm text-muted-foreground">
                        Lock account after this many failed login attempts
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => updateSecuritySetting('twoFactorAuth', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">Log all user actions for security auditing</p>
                      </div>
                      <Switch
                        checked={securitySettings.auditLogging}
                        onCheckedChange={(checked) => updateSecuritySetting('auditLogging', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* User Management - Super Admin Only */}
          {user?.role === 'super_admin' && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Management Settings</span>
                  </CardTitle>
                  <CardDescription>Configure default user settings and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Default User Permissions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Allow users to export data</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Allow users to upload documents</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require approval for new registrations</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Default Role for New Users</Label>
                      <Select defaultValue="support_worker">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support_worker">Support Worker</SelectItem>
                          <SelectItem value="support_coordinator">Support Coordinator</SelectItem>
                          <SelectItem value="allied_health">Allied Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Password Strength Requirements</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (8 characters)</SelectItem>
                          <SelectItem value="medium">Medium (8 chars, mixed case)</SelectItem>
                          <SelectItem value="high">High (12 chars, mixed case, symbols)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save User Management Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Database Settings - Super Admin Only */}
          {user?.role === 'super_admin' && (
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Database Management</span>
                  </CardTitle>
                  <CardDescription>Manage database backups and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Backup Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Automatic Backup Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Retention Period (days)</Label>
                          <Input type="number" defaultValue="30" />
                        </div>
                        <Button className="w-full">Create Manual Backup</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Maintenance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Database Size</Label>
                          <p className="text-2xl font-bold">2.4 GB</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Last Optimization</Label>
                          <p className="text-sm text-muted-foreground">3 days ago</p>
                        </div>
                        <Button variant="outline" className="w-full">Optimize Database</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="space-x-4">
                      <Button variant="destructive" size="sm">Export All Data</Button>
                      <Button variant="outline" size="sm">Reset Database</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
