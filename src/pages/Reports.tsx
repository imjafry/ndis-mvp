
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Download, TrendingUp, Users, DollarSign, Clock, 
  FileText, Calendar, Filter, Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Reports = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('month');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, participants: 125 },
    { month: 'Feb', revenue: 52000, participants: 130 },
    { month: 'Mar', revenue: 48000, participants: 128 },
    { month: 'Apr', revenue: 61000, participants: 135 },
    { month: 'May', revenue: 55000, participants: 132 },
    { month: 'Jun', revenue: 67000, participants: 140 },
  ];

  const serviceTypeData = [
    { name: 'Personal Care', value: 35, color: '#3B82F6' },
    { name: 'Community Access', value: 25, color: '#10B981' },
    { name: 'Allied Health', value: 20, color: '#F59E0B' },
    { name: 'Support Coordination', value: 15, color: '#EF4444' },
    { name: 'Transport', value: 5, color: '#8B5CF6' },
  ];

  const staffPerformanceData = [
    { name: 'Mike Chen', hours: 156, revenue: 7020, satisfaction: 4.8 },
    { name: 'Emma Davis', hours: 234, revenue: 14586, satisfaction: 4.9 },
    { name: 'Dr. Thompson', hours: 189, revenue: 18663, satisfaction: 4.7 },
    { name: 'Sarah Wilson', hours: 178, revenue: 8010, satisfaction: 4.6 },
  ];

  const utilizationData = [
    { participant: 'John Smith', budgetUsed: 65, budgetTotal: 100 },
    { participant: 'Sarah Johnson', budgetUsed: 40, budgetTotal: 100 },
    { participant: 'Michael Brown', budgetUsed: 85, budgetTotal: 100 },
    { participant: 'Lisa Davis', budgetUsed: 72, budgetTotal: 100 },
  ];

  if (!user || !['super_admin', 'support_coordinator'].includes(user.role)) {
    return (
      <AppLayout title="Reports & Analytics">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-red-600">Access Restricted</CardTitle>
              <CardDescription>Reports & Analytics is only available for Super Admins and Support Coordinators</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You do not have permission to access reporting features.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const kpiCards = [
    { title: 'Total Revenue', value: '$328,000', change: '+12.5%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Active Participants', value: '140', change: '+8.2%', icon: Users, color: 'text-blue-600' },
    { title: 'Service Hours', value: '2,847', change: '+15.3%', icon: Clock, color: 'text-purple-600' },
    { title: 'Invoices Processed', value: '89', change: '+5.7%', icon: FileText, color: 'text-orange-600' }
  ];

  return (
    <AppLayout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <p className="text-sm text-green-600 font-medium">{kpi.change}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gray-50">
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Participant Growth</CardTitle>
                <CardDescription>Monthly revenue and participant count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
                      <Line yAxisId="right" type="monotone" dataKey="participants" stroke="#10B981" strokeWidth={3} name="Participants" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Type Distribution</CardTitle>
                  <CardDescription>Breakdown of services by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {serviceTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {serviceTypeData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                  <CardDescription>NDIS budget usage by participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {utilizationData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.participant}</span>
                          <span>{item.budgetUsed}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${item.budgetUsed}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Revenue, costs, and profitability analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Analytics</CardTitle>
                <CardDescription>Participant engagement and service utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Participant analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance Metrics</CardTitle>
                <CardDescription>Hours worked, revenue generated, and satisfaction scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {staffPerformanceData.map((staff, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{staff.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Rating:</span>
                          <span className="font-semibold text-yellow-600">{staff.satisfaction}★</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Hours Worked</p>
                          <p className="text-lg font-semibold">{staff.hours}h</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Revenue Generated</p>
                          <p className="text-lg font-semibold">${staff.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hourly Rate</p>
                          <p className="text-lg font-semibold">${(staff.revenue / staff.hours).toFixed(2)}/hr</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Reports;
