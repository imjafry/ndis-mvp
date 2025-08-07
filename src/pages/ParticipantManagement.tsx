import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, 
  Phone, Mail, MapPin, Calendar, DollarSign, Eye, Edit, Trash2
} from 'lucide-react';
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
import { ParticipantForm } from '../components/forms/ParticipantForm';

interface Participant {
  id: string;
  name: string;
  ndisNumber: string;
  email: string;
  phone: string;
  address: string;
  planExpiry: string;
  totalBudget: number;
  usedBudget: number;
  status: 'active' | 'inactive' | 'pending';
  assignedStaff: string[];
  lastService: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  primaryDisability?: string;
  supportNeeds?: string;
  goals?: string;
  medicalInfo?: string;
  notes?: string;
}

const ParticipantManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'John Smith',
      ndisNumber: '4311234567',
      email: 'john.smith@email.com',
      phone: '0412 345 678',
      address: '123 Main St, Melbourne VIC 3000',
      planExpiry: '2024-12-31',
      totalBudget: 45000,
      usedBudget: 28500,
      status: 'active',
      assignedStaff: ['Mike Chen', 'Emma Davis'],
      lastService: '2024-01-15',
      dateOfBirth: '1985-03-15',
      emergencyContact: 'Mary Smith',
      emergencyPhone: '0412 111 222',
      primaryDisability: 'Intellectual Disability',
      supportNeeds: 'Daily living support, community access assistance',
      goals: 'Increase independence in daily activities, improve social skills',
      medicalInfo: 'No significant medical conditions',
      notes: 'Prefers morning appointments'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      ndisNumber: '4311234568',
      email: 'sarah.j@email.com',
      phone: '0423 456 789',
      address: '456 Oak Ave, Sydney NSW 2000',
      planExpiry: '2024-08-15',
      totalBudget: 38000,
      usedBudget: 15200,
      status: 'active',
      assignedStaff: ['Dr. Alex Thompson'],
      lastService: '2024-01-12'
    },
    {
      id: '3',
      name: 'Michael Brown',
      ndisNumber: '4311234569',
      email: 'michael.brown@email.com',
      phone: '0434 567 890',
      address: '789 Pine Rd, Brisbane QLD 4000',
      planExpiry: '2024-03-20',
      totalBudget: 52000,
      usedBudget: 41600,
      status: 'pending',
      assignedStaff: ['Emma Davis'],
      lastService: '2024-01-10'
    }
  ]);

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.ndisNumber.includes(searchTerm) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Total Participants', value: participants.length, icon: Users, color: 'text-blue-600' },
    { title: 'Active Participants', value: participants.filter(p => p.status === 'active').length, icon: Users, color: 'text-green-600' },
    { title: 'Pending Reviews', value: participants.filter(p => p.status === 'pending').length, icon: Calendar, color: 'text-yellow-600' },
    { title: 'Total Budget', value: `$${participants.reduce((sum, p) => sum + p.totalBudget, 0).toLocaleString()}`, icon: DollarSign, color: 'text-purple-600' }
  ];

  const handleAddParticipant = (data: any) => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      ...data,
      totalBudget: parseFloat(data.totalBudget),
      usedBudget: 0,
      status: 'active' as const,
      assignedStaff: [],
      lastService: 'Never'
    };
    setParticipants([...participants, newParticipant]);
    setIsAddDialogOpen(false);
  };

  const handleEditParticipant = (data: any) => {
    if (selectedParticipant) {
      const updatedParticipants = participants.map(participant => 
        participant.id === selectedParticipant.id 
          ? { ...participant, ...data, totalBudget: parseFloat(data.totalBudget) }
          : participant
      );
      setParticipants(updatedParticipants);
      setIsEditDialogOpen(false);
      setSelectedParticipant(null);
    }
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants(participants.filter(participant => participant.id !== id));
  };

  const getParticipantForForm = (participant: Participant) => {
    return {
      ...participant,
      totalBudget: participant.totalBudget.toString()
    };
  };

  return (
    <AppLayout title="Participant Management">
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
                    <div className={`p-3 rounded-full bg-gray-50`}>
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
                  <span>Participant Directory</span>
                </CardTitle>
                <CardDescription>Manage participant profiles and assignments</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Participant
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Participant</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new participant
                    </DialogDescription>
                  </DialogHeader>
                  <ParticipantForm 
                    onSubmit={handleAddParticipant}
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
                  placeholder="Search participants..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>NDIS Number</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Plan Details</TableHead>
                    <TableHead>Budget Usage</TableHead>
                    <TableHead>Assigned Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-sm text-gray-500">Last service: {participant.lastService}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{participant.ndisNumber}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {participant.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {participant.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">Expires: {participant.planExpiry}</p>
                          <p className="text-sm text-gray-500">Total: ${participant.totalBudget.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Used: ${participant.usedBudget.toLocaleString()}</span>
                            <span>{Math.round((participant.usedBudget / participant.totalBudget) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(participant.usedBudget / participant.totalBudget) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {participant.assignedStaff.map((staff, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {staff}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(participant.status)}>
                          {participant.status}
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
                                setSelectedParticipant(participant);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Assign Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteParticipant(participant.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Participant</DialogTitle>
              <DialogDescription>
                Update the details for {selectedParticipant?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedParticipant && (
              <ParticipantForm 
                participant={getParticipantForForm(selectedParticipant)}
                onSubmit={handleEditParticipant}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedParticipant(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ParticipantManagement;
