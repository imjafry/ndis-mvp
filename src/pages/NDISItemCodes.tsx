
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Code, Plus, Search, Download, Upload, 
  DollarSign, Calendar, Edit, Trash2
} from 'lucide-react';
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

interface NDISItem {
  id: string;
  code: string;
  description: string;
  category: string;
  unitType: string;
  price: number;
  gst: boolean;
  effectiveDate: string;
  status: 'active' | 'inactive' | 'deprecated';
  lastUpdated: string;
}

const NDISItemCodes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const [ndisItems] = useState<NDISItem[]>([
    {
      id: '1',
      code: '01_011_0107_1_1',
      description: 'Personal Care/Personal Activity',
      category: 'Core Support',
      unitType: 'Hour',
      price: 60.17,
      gst: false,
      effectiveDate: '2023-07-01',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      code: '01_013_0117_1_1',
      description: 'Community Nursing',
      category: 'Core Support',
      unitType: 'Hour',
      price: 78.20,
      gst: false,
      effectiveDate: '2023-07-01',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      code: '15_052_0128_6_1',
      description: 'Occupational Therapy Assessment',
      category: 'Capacity Building',
      unitType: 'Hour',
      price: 193.80,
      gst: false,
      effectiveDate: '2023-07-01',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '4',
      code: '09_012_0136_8_1',
      description: 'Transport',
      category: 'Core Support',
      unitType: 'Trip',
      price: 55.02,
      gst: true,
      effectiveDate: '2023-07-01',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '5',
      code: '03_021_0120_1_1',
      description: 'Household Tasks',
      category: 'Core Support',
      unitType: 'Hour',
      price: 60.17,
      gst: false,
      effectiveDate: '2023-07-01',
      status: 'active',
      lastUpdated: '2024-01-15'
    }
  ]);

  const categories = ['Core Support', 'Capacity Building', 'Capital Support'];

  const filteredItems = ndisItems.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { 
      title: 'Total Codes', 
      value: ndisItems.length, 
      icon: Code,
      color: 'text-blue-600'
    },
    { 
      title: 'Active Codes', 
      value: ndisItems.filter(item => item.status === 'active').length, 
      icon: Code,
      color: 'text-green-600'
    },
    { 
      title: 'Avg Price', 
      value: `$${Math.round(ndisItems.reduce((sum, item) => sum + item.price, 0) / ndisItems.length)}`, 
      icon: DollarSign,
      color: 'text-purple-600'
    },
    { 
      title: 'Last Updated', 
      value: new Date(Math.max(...ndisItems.map(item => new Date(item.lastUpdated).getTime()))).toLocaleDateString(), 
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <AppLayout title="NDIS Item Code Manager">
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
                  <Code className="h-5 w-5 text-blue-600" />
                  <span>NDIS Item Code Manager</span>
                </CardTitle>
                <CardDescription>Manage NDIS pricing schedule and service codes</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Code
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by code or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="codes" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="codes">Item Codes</TabsTrigger>
                <TabsTrigger value="pricing">Pricing History</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="codes" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Unit Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GST</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-sm font-medium">
                            {item.code}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate">{item.description}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{item.category}</Badge>
                          </TableCell>
                          <TableCell>{item.unitType}</TableCell>
                          <TableCell className="font-medium">
                            ${item.price}
                          </TableCell>
                          <TableCell>
                            <Badge className={item.gst ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                              {item.gst ? 'GST Inc' : 'GST Free'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing History</h3>
                  <p className="text-gray-500 mb-4">Track pricing changes over time</p>
                  <Button>View Price Changes</Button>
                </div>
              </TabsContent>

              <TabsContent value="bulk" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Bulk Price Update</h3>
                      <p className="text-sm text-gray-500 mb-4">Update prices for multiple codes at once</p>
                      <Button>Start Update</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Import New Codes</h3>
                      <p className="text-sm text-gray-500 mb-4">Import NDIS pricing schedule updates</p>
                      <Button>Import CSV</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Archive Codes</h3>
                      <p className="text-sm text-gray-500 mb-4">Archive deprecated or unused codes</p>
                      <Button variant="outline">Archive Selected</Button>
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

export default NDISItemCodes;
