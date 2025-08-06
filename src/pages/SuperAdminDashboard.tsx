
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, ClipboardList, DollarSign, 
  Calendar, Settings, TrendingUp, AlertCircle, 
  CheckCircle, Clock, FileText
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SuperAdminDashboard = () => {
  const stats = [
    { title: 'Total Participants', value: '147', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Staff', value: '23', change: '+3', icon: UserPlus, color: 'text-green-600' },
    { title: 'Pending Logs', value: '8', change: '-2', icon: ClipboardList, color: 'text-orange-600' },
    { title: 'Monthly Revenue', value: '$89,240', change: '+18%', icon: DollarSign, color: 'text-purple-600' }
  ];

  const quickActions = [
    { title: 'Add New Staff', icon: UserPlus, description: 'Onboard support workers', action: 'add-staff' },
    { title: 'Add Participant', icon: Users, description: 'Register new participant', action: 'add-participant' },
    { title: 'View Session Logs', icon: ClipboardList, description: 'Review recent activities', action: 'view-logs' },
    { title: 'System Settings', icon: Settings, description: 'Manage configurations', action: 'settings' }
  ];

  const recentActivities = [
    { type: 'session', participant: 'John Smith', worker: 'Mike Chen', time: '2 hours ago', status: 'completed' },
    { type: 'invoice', participant: 'Sarah Wilson', amount: '$480', time: '4 hours ago', status: 'pending' },
    { type: 'staff', worker: 'Emma Davis', action: 'Added new participant', time: '6 hours ago', status: 'info' },
    { type: 'review', participant: 'David Brown', action: 'Progress review due', time: '1 day ago', status: 'warning' }
  ];

  const upcomingTasks = [
    { task: 'Monthly compliance report', due: 'Tomorrow', priority: 'high' },
    { task: 'Staff performance reviews', due: 'This week', priority: 'medium' },
    { task: 'Audit preparation', due: 'Next week', priority: 'high' },
    { task: 'Budget planning meeting', due: '2 weeks', priority: 'low' }
  ];

  return (
    <AppLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-green-600">{stat.change} from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-gray-500">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current status overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Performance</span>
                  <span className="text-green-600">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Backup Status</span>
                  <span className="text-green-600">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Compliance Score</span>
                  <span className="text-green-600">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="pt-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-1 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'pending' ? 'bg-orange-100' :
                      activity.status === 'warning' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.status === 'pending' && <Clock className="h-4 w-4 text-orange-600" />}
                      {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-red-600" />}
                      {activity.status === 'info' && <FileText className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.participant && `${activity.participant} - `}
                        {activity.worker && `${activity.worker} - `}
                        {activity.action || 'Session completed'}
                        {activity.amount && ` - ${activity.amount}`}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Tasks</span>
              </CardTitle>
              <CardDescription>Important deadlines and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-gray-500">Due: {task.due}</p>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 
                              task.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SuperAdminDashboard;
