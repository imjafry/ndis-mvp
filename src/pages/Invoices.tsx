
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FileText, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Invoices = () => {
  const { user } = useAuth();

  const getInvoiceContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          title: 'Invoice Management - Auto & Manual + PDF/Email',
          description: 'Complete invoice management and generation',
          features: ['Generate invoices automatically', 'Manual invoice creation', 'PDF export', 'Email invoices', 'NDIS item codes', 'Payment tracking']
        };
      case 'support_worker':
        return {
          title: 'Invoices - From Logs',
          description: 'Generate invoices from your session logs',
          features: ['Invoice from session logs', 'NDIS item code selection', 'Time tracking', 'Expense reporting']
        };
      case 'support_coordinator':
        return {
          title: 'Invoices - Not Available',
          description: 'Invoice generation is not available for your role',
          features: []
        };
      case 'allied_health':
        return {
          title: 'Invoices - From Logs',
          description: 'Generate invoices from therapy sessions',
          features: ['Invoice from therapy logs', 'NDIS item codes for therapy', 'Treatment billing', 'Assessment invoicing']
        };
      default:
        return {
          title: 'Invoices',
          description: 'Invoice management',
          features: []
        };
    }
  };

  const content = getInvoiceContent();

  if (user?.role === 'support_coordinator') {
    return (
      <AppLayout title="Invoices">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-red-600">Access Restricted</CardTitle>
              <CardDescription>Invoice generation is not available for Support Coordinators</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As a Support Coordinator, you do not have access to invoice generation features.
                Please contact your administrator if you believe this is an error.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Invoices">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-green-50">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Invoice features available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <Download className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Invoice generation features are under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Invoice generation with NDIS item codes, automatic calculations, and PDF export will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Invoices;
