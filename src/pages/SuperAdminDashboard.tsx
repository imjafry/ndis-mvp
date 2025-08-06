
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, ClipboardList, DollarSign, 
  Calendar, Settings, TrendingUp, AlertCircle, 
  CheckCircle, Clock, FileText, ArrowUpRight,
  Activity, BarChart3
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SuperAdminDashboard = () => {
  const stats = [
    { 
      title: 'Total Participants', 
      value: '147', 
      change: '+12%', 
      changeType: 'positive',
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active participants'
    },
    { 
      title: 'Active Staff', 
      value: '23', 
      change: '+3', 
      changeType: 'positive',
      icon: UserPlus, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Currently employed'
    },
    { 
      title: 'Pending Logs', 
      value: '8', 
      change: '-2', 
      changeType: 'negative',
      icon: ClipboardList, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Awaiting approval'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$89,240', 
      change: '+18%', 
      changeType: 'positive',
      icon: DollarSign, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'This month'
    }
  ];

  const quickActions = [
    { 
      title: 'Add New Staff', 
      icon: UserPlus, 
      description: 'Onboard support workers', 
      action: 'add-staff',
      color: 'blue'
    },
    { 
      title: 'Add Participant', 
      icon: Users, 
      description: 'Register new participant', 
      action: 'add-participant',
      color: 'green'
    },
    { 
      title: 'View Session Logs', 
      icon: ClipboardList, 
      description: 'Review recent activities', 
      action: 'view-logs',
      color: 'orange'
    },
    { 
      title: 'System Settings', 
      icon: Settings, 
      description: 'Manage configurations', 
      action: 'settings',
      color: 'purple'
    }
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
    <AppLayout title="Dashboard">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Good morning! 👋</h2>
          <p className="text-blue-100">Here's what's happening with your NDIS services today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-2">{stat.value}</div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`flex items-center space-x-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">{stat.change}</span>
                    </div>
                    <span className="text-muted-foreground">from last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10">
                  <div className={`w-full h-full rounded-full ${stat.bgColor} opacity-20`}></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common administrative tasks to get you started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const colorMap = {
                    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
                    green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
                    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700',
                    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
                  };
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto p-4 justify-start ${colorMap[action.color as keyof typeof colorMap]} transition-all duration-200 group`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-white/80">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{action.title}</div>
                            <div className="text-xs opacity-70">{action.description}</div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>System Health</span>
              </CardTitle>
              <CardDescription>Current status overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Server Performance</span>
                  <span className="text-green-600 font-semibold">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Data Backup Status</span>
                  <span className="text-green-600 font-semibold">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Compliance Score</span>
                  <span className="text-green-600 font-semibold">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="pt-4">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  All Systems Operational
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-full ${
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
                      <p className="text-sm font-medium text-foreground">
                        {activity.participant && `${activity.participant} - `}
                        {activity.worker && `${activity.worker} - `}
                        {activity.action || 'Session completed'}
                        {activity.amount && ` - ${activity.amount}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Upcoming Tasks</span>
              </CardTitle>
              <CardDescription>Important deadlines and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{task.task}</p>
                      <p className="text-xs text-muted-foreground mt-1">Due: {task.due}</p>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 
                              task.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs font-medium"
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
