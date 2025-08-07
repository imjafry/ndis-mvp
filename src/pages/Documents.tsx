
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Upload, FileText, Folder, Search, Filter, MoreVertical, 
  Download, Eye, Trash2, AlertTriangle, Calendar, User
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Document {
  id: string;
  name: string;
  type: 'ndis_plan' | 'assessment' | 'report' | 'certificate' | 'photo' | 'other';
  participantName: string;
  uploadedBy: string;
  uploadDate: string;
  expiryDate?: string;
  size: string;
  status: 'current' | 'expired' | 'expiring_soon';
  tags: string[];
}

const Documents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Mock data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'NDIS Plan - John Smith.pdf',
      type: 'ndis_plan',
      participantName: 'John Smith',
      uploadedBy: 'Emma Davis',
      uploadDate: '2024-01-15',
      expiryDate: '2024-12-31',
      size: '2.4 MB',
      status: 'current',
      tags: ['ndis', 'plan', 'annual']
    },
    {
      id: '2',
      name: 'Occupational Therapy Assessment.pdf',
      type: 'assessment',
      participantName: 'Sarah Johnson',
      uploadedBy: 'Dr. Alex Thompson',
      uploadDate: '2024-01-12',
      expiryDate: '2024-03-15',
      size: '1.8 MB',
      status: 'expiring_soon',
      tags: ['ot', 'assessment', 'functional']
    },
    {
      id: '3',
      name: 'Progress Report - December.docx',
      type: 'report',
      participantName: 'Michael Brown',
      uploadedBy: 'Mike Chen',
      uploadDate: '2024-01-10',
      size: '856 KB',
      status: 'current',
      tags: ['progress', 'monthly', 'goals']
    },
    {
      id: '4',
      name: 'First Aid Certificate.jpg',
      type: 'certificate',
      participantName: 'Staff Documents',
      uploadedBy: 'System',
      uploadDate: '2023-12-01',
      expiryDate: '2024-02-15',
      size: '1.2 MB',
      status: 'expiring_soon',
      tags: ['staff', 'certificate', 'first-aid']
    }
  ]);

  const getAccessLevel = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          canUpload: true,
          canDelete: true,
          canViewAll: true,
          title: 'Document Management - All Participants',
          description: 'Complete document access and management for all participants'
        };
      case 'support_coordinator':
        return {
          canUpload: true,
          canDelete: false,
          canViewAll: false,
          title: 'Documents - My Participants',
          description: 'Manage documents for coordinated participants'
        };
      case 'allied_health':
        return {
          canUpload: true,
          canDelete: false,
          canViewAll: false,
          title: 'Documents - My Clients',
          description: 'Manage therapy and assessment documents'
        };
      case 'support_worker':
        return {
          canUpload: true,
          canDelete: false,
          canViewAll: false,
          title: 'Documents - My Participants',
          description: 'Upload session documents for assigned participants'
        };
      default:
        return {
          canUpload: false,
          canDelete: false,
          canViewAll: false,
          title: 'Documents',
          description: 'Document management'
        };
    }
  };

  const accessLevel = getAccessLevel();

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ndis_plan': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'assessment': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'report': return <FileText className="h-4 w-4 text-green-600" />;
      case 'certificate': return <FileText className="h-4 w-4 text-orange-600" />;
      case 'photo': return <FileText className="h-4 w-4 text-pink-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = [
    { title: 'Total Documents', value: documents.length, icon: FileText },
    { title: 'Expiring Soon', value: documents.filter(d => d.status === 'expiring_soon').length, icon: AlertTriangle },
    { title: 'This Month', value: documents.filter(d => d.uploadDate.startsWith('2024-01')).length, icon: Calendar },
    { title: 'My Uploads', value: documents.filter(d => d.uploadedBy === user?.name).length, icon: User }
  ];

  const DocumentUploadForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Select Files</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
          <p className="text-sm text-gray-500">Support: PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
          <input type="file" multiple className="hidden" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Document Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="ndis_plan">NDIS Plan</option>
            <option value="assessment">Assessment</option>
            <option value="report">Report</option>
            <option value="certificate">Certificate</option>
            <option value="photo">Photo</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Participant</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Select participant</option>
            <option value="john_smith">John Smith</option>
            <option value="sarah_johnson">Sarah Johnson</option>
            <option value="michael_brown">Michael Brown</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
          <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input type="text" placeholder="Enter tags separated by commas" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setIsUploadDialogOpen(false)}>
          Upload Documents
        </Button>
      </div>
    </div>
  );

  return (
    <AppLayout title={accessLevel.title}>
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
                  <Folder className="h-5 w-5 text-blue-600" />
                  <span>Document Library</span>
                </CardTitle>
                <CardDescription>{accessLevel.description}</CardDescription>
              </div>
              {accessLevel.canUpload && (
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upload Documents</DialogTitle>
                      <DialogDescription>
                        Upload documents for participants or staff
                      </DialogDescription>
                    </DialogHeader>
                    <DocumentUploadForm />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="ndis_plan">NDIS Plans</option>
                <option value="assessment">Assessments</option>
                <option value="report">Reports</option>
                <option value="certificate">Certificates</option>
                <option value="photo">Photos</option>
                <option value="other">Other</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Participant</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {getTypeIcon(doc.type)}
                              <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-500">{doc.size}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{doc.participantName}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {doc.type.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{doc.uploadDate}</p>
                              <p className="text-xs text-gray-500">by {doc.uploadedBy}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {doc.expiryDate ? (
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span className="text-sm">{doc.expiryDate}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">No expiry</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status.replace('_', ' ')}
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
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                {accessLevel.canDelete && (
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="grid" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          {getTypeIcon(doc.type)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              {accessLevel.canDelete && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <h4 className="font-medium text-sm mb-2 line-clamp-2">{doc.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{doc.participantName}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{doc.size}</span>
                          <span>{doc.uploadDate}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {doc.type.replace('_', ' ')}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doc.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                            {doc.tags.length > 3 && (
                              <span className="text-xs text-gray-400">+{doc.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Documents;
