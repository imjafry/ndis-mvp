
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Clock, Plus, Search, CheckCircle, XCircle, 
  AlertCircle, Calendar, User, MapPin, FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface ShiftLog {
  id: string;
  staffName: string;
  participantName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  serviceType: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  travelKms: number;
  amount: number;
  submittedAt: string;
}

const ShiftLogs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const [shiftLogs] = useState<ShiftLog[]>([
    {
      id: '1',
      staffName: 'Mike Chen',
      participantName: 'John Smith',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '12:00',
      duration: 3,
      serviceType: 'Personal Care',
      status: 'approved',
      notes: 'Assisted with daily living activities, medication reminders completed.',
      travelKms: 15,
      amount: 180.50,
      submittedAt: '2024-01-15T15:30:00'
    },
    {
      id: '2',
      staffName: 'Emma Davis',
      participantName: 'Sarah Johnson',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:30',
      duration: 2.5,
      serviceType: 'Community Access',
      status: 'pending',
      notes: 'Supported community shopping and banking activities.',
      travelKms: 22,
      amount: 165.75,
      submittedAt: '2024-01-15T17:00:00'
    },
    {
      id: '3',
      staffName: 'Dr. Alex Thompson',
      participantName: 'Michael Brown',
      date: '2024-01-14',
      startTime: '10:00',
      endTime: '11:30',
      duration: 1.5,
      serviceType: 'Allied Health Assessment',
      status: 'rejected',
      notes: 'Occupational therapy assessment - needs additional documentation.',
      travelKms: 8,
      amount: 195.00,
      submittedAt: '2024-01-14T13:20:00'
    }
  ]);

  const filteredLogs = shiftLogs.filter(log => {
    const matchesSearch = log.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Total Logs', value: shiftLogs.length, icon: Clock },
    { title: 'Pending Approval', value: shiftLogs.filter(l => l.status === 'pending').length, icon: AlertCircle },
    { title: 'Approved Today', value: shiftLogs.filter(l => l.status === 'approved' && l.date === '2024-01-15').length, icon: CheckCircle },
    { title: 'Total Hours', value: `${shiftLogs.reduce((sum, l) => sum + l.duration, 0)}hrs`, icon: Clock }
  ];

  const isStaffUser = user?.role === 'support_worker' || user?.role === 'allied_health';

  return (
    <AppLayout title="Shift Logs / Timesheets">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gray-50">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>{isStaffUser ? 'My Shift Logs' : 'All Shift Logs'}</span>
                </CardTitle>
                <CardDescription>
                  {isStaffUser ? 'Submit and track your service logs' : 'Review and approve staff shift logs'}
                </CardDescription>
              </div>
              {isStaffUser && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Shift Log
                </Button>
              )}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="logs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="logs">Shift Logs</TabsTrigger>
                <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="logs" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Participant</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Travel</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{log.staffName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{log.participantName}</TableCell>
                          <TableCell>
                            <div>
                              <div className="flex items-center text-sm">
                                <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                {log.date}
                              </div>
                              <div className="text-sm text-gray-500">
                                {log.startTime} - {log.endTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{log.serviceType}</Badge>
                          </TableCell>
                          <TableCell>{log.duration}hrs</TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                              {log.travelKms}km
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">${log.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(log.status)}
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              {!isStaffUser && log.status === 'pending' && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">This Week</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {shiftLogs.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.duration, 0)}hrs
                      </p>
                      <p className="text-sm text-gray-500">Total approved hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Earnings</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ${shiftLogs.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.amount, 0)}
                      </p>
                      <p className="text-sm text-gray-500">This week's earnings</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Travel</h3>
                      <p className="text-2xl font-bold text-purple-600">
                        {shiftLogs.reduce((sum, l) => sum + l.travelKms, 0)}km
                      </p>
                      <p className="text-sm text-gray-500">Total distance</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ShiftLogs;
