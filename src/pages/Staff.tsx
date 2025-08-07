
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, 
  Phone, Mail, MapPin, Calendar, DollarSign, Eye, Edit, Trash2, Shield
} from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StaffForm } from '../components/forms/StaffForm';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  specialization?: string;
  hourlyRate: number;
  startDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  certifications?: string;
  assignedParticipants: number;
  totalHours: number;
  lastLogin: string;
}

const Staff = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      phone: '0412 345 678',
      role: 'support_worker',
      hourlyRate: 45.50,
      startDate: '2023-06-15',
      status: 'active',
      certifications: 'First Aid, NDIS Worker Screening',
      assignedParticipants: 8,
      totalHours: 156,
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      phone: '0423 456 789',
      role: 'support_coordinator',
      hourlyRate: 62.30,
      startDate: '2023-03-20',
      status: 'active',
      certifications: 'Bachelor Social Work, NDIS Provider',
      assignedParticipants: 12,
      totalHours: 234,
      lastLogin: '2024-01-14'
    },
    {
      id: '3',
      name: 'Dr. Alex Thompson',
      email: 'alex.thompson@example.com',
      phone: '0434 567 890',
      role: 'allied_health',
      specialization: 'Occupational Therapy',
      hourlyRate: 98.75,
      startDate: '2023-01-10',
      status: 'active',
      certifications: 'AHPRA Registration, OT Australia',
      assignedParticipants: 15,
      totalHours: 189,
      lastLogin: '2024-01-13'
    }
  ]);

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
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'support_coordinator': return 'bg-blue-100 text-blue-800';
      case 'allied_health': return 'bg-purple-100 text-purple-800';
      case 'support_worker': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Total Staff', value: staffMembers.length, icon: Users, color: 'text-blue-600' },
    { title: 'Active Staff', value: staffMembers.filter(s => s.status === 'active').length, icon: Shield, color: 'text-green-600' },
    { title: 'Support Workers', value: staffMembers.filter(s => s.role === 'support_worker').length, icon: Users, color: 'text-purple-600' },
    { title: 'Allied Health', value: staffMembers.filter(s => s.role === 'allied_health').length, icon: Users, color: 'text-orange-600' }
  ];

  const handleAddStaff = (data: any) => {
    const newStaff: StaffMember = {
      id: Date.now().toString(),
      ...data,
      hourlyRate: parseFloat(data.hourlyRate),
      status: 'active' as const,
      assignedParticipants: 0,
      totalHours: 0,
      lastLogin: 'Never'
    };
    setStaffMembers([...staffMembers, newStaff]);
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = (data: any) => {
    if (selectedStaff) {
      const updatedStaff = staffMembers.map(staff => 
        staff.id === selectedStaff.id 
          ? { ...staff, ...data, hourlyRate: parseFloat(data.hourlyRate) }
          : staff
      );
      setStaffMembers(updatedStaff);
      setIsEditDialogOpen(false);
      setSelectedStaff(null);
    }
  };

  const handleDeleteStaff = (id: string) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== id));
  };

  // Convert staff data for form (numbers to strings)
  const getStaffForForm = (staff: StaffMember) => {
    return {
      ...staff,
      hourlyRate: staff.hourlyRate.toString()
    };
  };

  return (
    <AppLayout title="Staff Management">
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
                      <Icon className={`h-6 w-6 ${stat.color}`} />
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
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Staff Directory</span>
                </CardTitle>
                <CardDescription>Manage staff accounts, roles and permissions</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new staff member
                    </DialogDescription>
                  </DialogHeader>
                  <StaffForm 
                    onSubmit={handleAddStaff}
                    onCancel={() => setIsAddDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="support_worker">Support Workers</option>
                <option value="support_coordinator">Support Coordinators</option>
                <option value="allied_health">Allied Health</option>
                <option value="super_admin">Super Admins</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Rate & Hours</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-500">Started: {staff.startDate}</p>
                          {staff.specialization && (
                            <p className="text-xs text-blue-600">{staff.specialization}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(staff.role)}>
                          {staff.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {staff.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {staff.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">${staff.hourlyRate}/hr</p>
                          <p className="text-sm text-gray-500">{staff.totalHours}h total</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">{staff.assignedParticipants}</p>
                          <p className="text-xs text-gray-500">participants</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(staff.status)}>
                          {staff.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedStaff(staff);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Assign Participants
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteStaff(staff.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Staff Member</DialogTitle>
              <DialogDescription>
                Update the details for {selectedStaff?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedStaff && (
              <StaffForm 
                staff={getStaffForForm(selectedStaff)}
                onSubmit={handleEditStaff}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedStaff(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Staff;
