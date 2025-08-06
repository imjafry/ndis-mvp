
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, MapPin, User, Plus, 
  ClipboardList, DollarSign, CheckCircle, 
  AlertCircle, FileText, Navigation
} from 'lucide-react';

const SupportWorkerDashboard = () => {
  const todaysShifts = [
    {
      id: 1,
      participant: 'John Smith',
      time: '9:00 AM - 12:00 PM',
      location: '123 Collins St, Melbourne',
      service: 'Daily Living Skills',
      status: 'upcoming',
      travel: '15 mins'
    },
    {
      id: 2,
      participant: 'Emma Wilson',
      time: '2:00 PM - 5:00 PM',
      location: '456 Bourke St, Melbourne',
      service: 'Community Access',
      status: 'upcoming',
      travel: '20 mins'
    }
  ];

  const recentSessions = [
    {
      id: 1,
      participant: 'Sarah Davis',
      date: 'Yesterday',
      service: 'Personal Care',
      duration: '2.5 hours',
      status: 'completed',
      invoiceStatus: 'pending'
    },
    {
      id: 2,
      participant: 'Michael Brown',
      date: 'Jan 14',
      service: 'Transport',
      duration: '1.5 hours',
      status: 'completed',
      invoiceStatus: 'approved'
    }
  ];

  const stats = [
    { title: 'Today\'s Sessions', value: '2', icon: Calendar, color: 'text-blue-600' },
    { title: 'This Week', value: '8', icon: Clock, color: 'text-green-600' },
    { title: 'Pending Logs', value: '1', icon: ClipboardList, color: 'text-orange-600' },
    { title: 'This Month Earnings', value: '$2,840', icon: DollarSign, color: 'text-purple-600' }
  ];

  const quickActions = [
    { title: 'Log Session', icon: Plus, description: 'Record completed session', color: 'bg-blue-500' },
    { title: 'View Schedule', icon: Calendar, description: 'Check upcoming shifts', color: 'bg-green-500' },
    { title: 'Submit Expenses', icon: DollarSign, description: 'Log travel/expenses', color: 'bg-purple-500' },
    { title: 'Message Coordinator', icon: FileText, description: 'Send update', color: 'bg-orange-500' }
  ];

  return (
    <AppLayout title="Support Worker Dashboard">
      <div className="space-y-6">
        {/* Stats */}
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2 hover:shadow-md transition-all"
                  >
                    <div className={`p-3 ${action.color} rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Shifts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Schedule</span>
              </CardTitle>
              <CardDescription>Your upcoming shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysShifts.map((shift) => (
                  <div key={shift.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{shift.participant}</h4>
                        <p className="text-sm text-gray-600">{shift.service}</p>
                      </div>
                      <Badge variant={shift.status === 'upcoming' ? 'default' : 'secondary'}>
                        {shift.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{shift.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{shift.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Navigation className="h-4 w-4" />
                        <span>Travel time: {shift.travel}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                    </div>
                  </div>
                ))}
                
                {todaysShifts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No shifts scheduled for today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5" />
                <span>Recent Sessions</span>
              </CardTitle>
              <CardDescription>Your completed sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{session.participant}</h4>
                        <p className="text-sm text-gray-600">{session.service}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{session.status}</Badge>
                        <Badge variant={session.invoiceStatus === 'approved' ? 'default' : 'outline'}>
                          {session.invoiceStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{session.date} • {session.duration}</span>
                      <div className="flex items-center space-x-1">
                        {session.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SupportWorkerDashboard;
