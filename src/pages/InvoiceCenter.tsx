import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, Plus, Search, Download, Send, 
  FileText, DollarSign, Calendar, User, Eye
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InvoiceView } from '../components/invoices/InvoiceView';

interface Invoice {
  id: string;
  invoiceNumber: string;
  participantName: string;
  participantNdis: string;
  participantAddress: string;
  staffName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  ndisItems: Array<{
    code: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  notes: string;
  subtotal: number;
  gst: number;
  total: number;
}

const InvoiceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceViewOpen, setIsInvoiceViewOpen] = useState(false);

  // Mock data
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      participantName: 'John Smith',
      participantNdis: '4311234567',
      participantAddress: '123 Main St, Melbourne VIC 3000',
      staffName: 'Mike Chen',
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      amount: 542.50,
      status: 'sent',
      subtotal: 493.18,
      gst: 49.32,
      total: 542.50,
      ndisItems: [
        { code: '01_011_0107_1_1', description: 'Personal Care/Personal Activity', quantity: 3, rate: 60.17, amount: 180.51 },
        { code: '01_013_0117_1_1', description: 'Community Nursing', quantity: 2, rate: 78.20, amount: 156.40 },
        { code: '01_015_0136_1_1', description: 'Group Activities', quantity: 4, rate: 51.40, amount: 205.60 }
      ],
      notes: 'Regular weekly services provided'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      participantName: 'Sarah Johnson',
      participantNdis: '4311234568',
      participantAddress: '456 Oak Ave, Sydney NSW 2000',
      staffName: 'Emma Davis',
      issueDate: '2024-01-14',
      dueDate: '2024-02-13',
      amount: 785.20,
      status: 'paid',
      subtotal: 713.82,
      gst: 71.38,
      total: 785.20,
      ndisItems: [
        { code: '15_052_0128_6_1', description: 'Occupational Therapy Assessment', quantity: 1, rate: 193.80, amount: 193.80 },
        { code: '01_011_0107_1_1', description: 'Personal Care/Personal Activity', quantity: 8, rate: 60.17, amount: 481.36 },
        { code: '09_012_0136_8_1', description: 'Transport', quantity: 2, rate: 55.02, amount: 110.04 }
      ],
      notes: 'Includes OT assessment and follow-up care'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      participantName: 'Michael Brown',
      participantNdis: '4311234569',
      participantAddress: '789 Pine Rd, Brisbane QLD 4000',
      staffName: 'Dr. Alex Thompson',
      issueDate: '2024-01-10',
      dueDate: '2024-02-09',
      amount: 1240.80,
      status: 'overdue',
      subtotal: 1128.00,
      gst: 112.80,
      total: 1240.80,
      ndisItems: [
        { code: '15_052_0128_6_1', description: 'Physiotherapy', quantity: 4, rate: 193.80, amount: 775.20 },
        { code: '15_054_0128_6_1', description: 'Allied Health Report', quantity: 1, rate: 290.30, amount: 290.30 },
        { code: '09_012_0136_8_1', description: 'Transport', quantity: 3, rate: 58.43, amount: 175.29 }
      ],
      notes: 'Multi-disciplinary assessment and treatment plan'
    }
  ]);

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceViewOpen(true);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.staffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { 
      title: 'Total Invoiced', 
      value: `$${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`, 
      icon: DollarSign,
      color: 'text-green-600'
    },
    { 
      title: 'Outstanding', 
      value: `$${invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`, 
      icon: CreditCard,
      color: 'text-orange-600'
    },
    { 
      title: 'Overdue', 
      value: invoices.filter(inv => inv.status === 'overdue').length, 
      icon: Calendar,
      color: 'text-red-600'
    },
    { 
      title: 'This Month', 
      value: invoices.filter(inv => inv.issueDate.startsWith('2024-01')).length, 
      icon: FileText,
      color: 'text-blue-600'
    }
  ];

  return (
    <AppLayout title="Invoice Center">
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
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>Invoice Management</span>
                </CardTitle>
                <CardDescription>Generate, track and manage NDIS invoices</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
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
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="invoices" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="invoices">All Invoices</TabsTrigger>
                <TabsTrigger value="recurring">Recurring</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="invoices" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Participant</TableHead>
                        <TableHead>Staff</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-sm font-medium">
                            {invoice.invoiceNumber}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{invoice.participantName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{invoice.staffName}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                              {invoice.issueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                              {invoice.dueDate}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${invoice.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewInvoice(invoice)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              {invoice.status === 'draft' && (
                                <Button variant="ghost" size="sm">
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="recurring" className="space-y-4">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recurring Invoices</h3>
                  <p className="text-gray-500 mb-4">Set up automatic invoice generation for regular services</p>
                  <Button>Create Recurring Template</Button>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Monthly Revenue</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ${invoices.filter(inv => inv.issueDate.startsWith('2024-01')).reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">January 2024</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Collection Rate</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round((invoices.filter(inv => inv.status === 'paid').length / invoices.length) * 100)}%
                      </p>
                      <p className="text-sm text-gray-500">Of invoices paid</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Avg Invoice Value</h3>
                      <p className="text-2xl font-bold text-purple-600">
                        ${Math.round(invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length)}
                      </p>
                      <p className="text-sm text-gray-500">Per invoice</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Invoice View Dialog */}
        <Dialog open={isInvoiceViewOpen} onOpenChange={setIsInvoiceViewOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
            {selectedInvoice && (
              <InvoiceView 
                invoice={selectedInvoice}
                onClose={() => setIsInvoiceViewOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default InvoiceCenter;
