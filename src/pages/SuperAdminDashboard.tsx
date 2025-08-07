
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, ClipboardList, DollarSign, 
  Calendar, Settings, TrendingUp, AlertCircle, 
  CheckCircle, Clock, FileText, ArrowUpRight,
  Activity, BarChart3, Zap
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SuperAdminDashboard = () => {
  const stats = [
    { 
      title: 'Total Participants', 
      value: '147', 
      change: '+12%', 
      changeType: 'positive' as const,
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      description: 'Active participants',
      subtext: 'from last month'
    },
    { 
      title: 'Active Staff', 
      value: '23', 
      change: '+3', 
      changeType: 'positive' as const,
      icon: UserPlus, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
      description: 'Currently employed',
      subtext: 'from last month'
    },
    { 
      title: 'Pending Logs', 
      value: '8', 
      change: '-2', 
      changeType: 'negative' as const,
      icon: ClipboardList, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      description: 'Awaiting approval',
      subtext: 'from last month'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$89,240', 
      change: '+18%', 
      changeType: 'positive' as const,
      icon: DollarSign, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      description: 'This month',
      subtext: 'from last month'
    }
  ];

  const quickActions = [
    { 
      title: 'Add New Staff', 
      description: 'Onboard support workers', 
      icon: UserPlus, 
      action: 'add-staff',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    { 
      title: 'Add Participant', 
      description: 'Register new participant', 
      icon: Users, 
      action: 'add-participant',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    },
    { 
      title: 'View Session Logs', 
      description: 'Review recent activities', 
      icon: ClipboardList, 
      action: 'view-logs',
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200'
    },
    { 
      title: 'System Settings', 
      description: 'Manage configurations', 
      icon: Settings, 
      action: 'settings',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="w-full max-w-full">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Good morning! 👋</h2>
          <p className="text-blue-100 text-lg">Here's what's happening with your NDIS services today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium flex items-center ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'positive' ? '↗' : '↘'} {stat.change}
                        </span>
                        <span className="text-sm text-gray-500">{stat.subtext}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
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
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${action.borderColor} ${action.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                          <Icon className={`h-6 w-6 ${action.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${action.textColor} mb-1`}>{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowUpRight className={`h-4 w-4 ${action.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <span>System Health</span>
              </CardTitle>
              <CardDescription>Current status overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Server Performance</span>
                  <span className="text-green-600 font-bold">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Data Backup Status</span>
                  <span className="text-green-600 font-bold">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Compliance Score</span>
                  <span className="text-green-600 font-bold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SuperAdminDashboard;
