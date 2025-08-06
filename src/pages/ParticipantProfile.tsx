
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, Calendar, Target, FileText, Activity, 
  Phone, Mail, MapPin, Clock, DollarSign,
  Edit, Plus, Download, Upload, AlertCircle
} from 'lucide-react';

const ParticipantProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Mock participant data
  const participant = {
    id: 'P001',
    name: 'John Smith',
    dateOfBirth: '1995-03-15',
    ndisNumber: 'NDIS123456789',
    planStartDate: '2024-01-01',
    planEndDate: '2024-12-31',
    planManager: 'Self-Managed',
    primaryDisability: 'Autism Spectrum Disorder',
    address: '123 Collins Street, Melbourne VIC 3000',
    phone: '+61 3 9000 0000',
    email: 'john.smith@email.com',
    emergencyContact: {
      name: 'Mary Smith (Mother)',
      phone: '+61 3 9000 0001'
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  };

  const goals = [
    {
      id: 1,
      category: 'Daily Living Skills',
      goal: 'Improve independent cooking skills',
      progress: 75,
      status: 'In Progress',
      dueDate: '2024-06-30',
      description: 'Participant will prepare 3 different meals independently'
    },
    {
      id: 2,
      category: 'Social Participation',
      goal: 'Increase community engagement',
      progress: 45,
      status: 'In Progress',
      dueDate: '2024-08-15',
      description: 'Attend 2 community activities per week'
    },
    {
      id: 3,
      category: 'Communication',
      goal: 'Enhance verbal communication',
      progress: 90,
      status: 'Nearly Complete',
      dueDate: '2024-05-30',
      description: 'Use verbal communication in 80% of interactions'
    }
  ];

  const progressNotes = [
    {
      id: 1,
      date: '2024-01-15',
      worker: 'Mike Chen',
      session: 'Daily Living Skills',
      duration: '2.5 hours',
      notes: 'Great progress on cooking skills. Successfully prepared pasta dish with minimal assistance.',
      outcomes: ['Followed recipe independently', 'Used kitchen equipment safely', 'Cleaned up after cooking']
    },
    {
      id: 2,
      date: '2024-01-12',
      worker: 'Emma Davis',
      session: 'Community Access',
      duration: '3 hours',
      notes: 'Attended local community center. Participated in arts and crafts activity.',
      outcomes: ['Interacted with 3 new people', 'Completed art project', 'Expressed interest in returning']
    }
  ];

  const documents = [
    { id: 1, name: 'NDIS Plan 2024.pdf', type: 'Plan', uploadDate: '2024-01-01', size: '2.3 MB' },
    { id: 2, name: 'Assessment Report.pdf', type: 'Assessment', uploadDate: '2024-01-15', size: '1.8 MB' },
    { id: 3, name: 'Service Agreement.pdf', type: 'Agreement', uploadDate: '2024-01-01', size: '0.9 MB' },
    { id: 4, name: 'Progress Photos.jpg', type: 'Progress', uploadDate: '2024-01-10', size: '4.2 MB' }
  ];

  const serviceUsage = {
    totalBudget: 45000,
    usedBudget: 12750,
    remainingBudget: 32250,
    categories: [
      { name: 'Core Supports', budget: 30000, used: 8500, remaining: 21500 },
      { name: 'Capacity Building', budget: 10000, used: 3250, remaining: 6750 },
      { name: 'Capital Supports', budget: 5000, used: 1000, remaining: 4000 }
    ]
  };

  return (
    <AppLayout title={`${participant.name} - Profile`}>
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback className="text-2xl">{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{participant.name}</h1>
                    <p className="text-lg text-gray-600">NDIS: {participant.ndisNumber}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Plan: {participant.planStartDate} - {participant.planEndDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{participant.planManager}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline" className="text-green-600 border-green-200">Active Plan</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="documents">Files</TabsTrigger>
            <TabsTrigger value="usage">Service Usage</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-sm text-gray-900">{participant.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Primary Disability</label>
                      <p className="text-sm text-gray-900">{participant.primaryDisability}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Address</span>
                    </label>
                    <p className="text-sm text-gray-900">{participant.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-sm text-gray-900">{participant.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-sm text-gray-900">{participant.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                      <p className="text-sm text-gray-900">{participant.emergencyContact.name}</p>
                      <p className="text-sm text-gray-500">{participant.emergencyContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Current Goals</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
            
            <div className="grid gap-6">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{goal.category}</Badge>
                            <Badge variant={goal.status === 'Nearly Complete' ? 'default' : 'secondary'}>
                              {goal.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-lg">{goal.goal}</h4>
                          <p className="text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {goal.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Notes */}
          <TabsContent value="progress" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Progress Notes</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
            
            <div className="space-y-4">
              {progressNotes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{note.session}</h4>
                            <Badge variant="outline">{note.worker}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{note.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{note.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Session Notes</h5>
                        <p className="text-gray-700">{note.notes}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Key Outcomes</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {note.outcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Documents & Files</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
            
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <Badge variant="outline">{doc.type}</Badge>
                            <span>Uploaded: {doc.uploadDate}</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Service Usage */}
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Current plan budget utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        ${serviceUsage.totalBudget.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Budget</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${serviceUsage.usedBudget.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Used</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        ${serviceUsage.remainingBudget.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {serviceUsage.categories.map((category, index) => {
                      const percentage = (category.used / category.budget) * 100;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{category.name}</h4>
                            <span className="text-sm text-gray-500">
                              ${category.used.toLocaleString()} / ${category.budget.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ParticipantProfile;
