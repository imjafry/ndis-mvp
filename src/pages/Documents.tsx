
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Folder } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Documents = () => {
  const { user } = useAuth();

  const getDocumentContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          title: 'Document Management - For Any Participant',
          description: 'Complete document access and management',
          features: ['Upload documents for any participant', 'Global document search', 'Document approval workflow', 'Compliance tracking', 'Bulk document operations']
        };
      case 'support_worker':
        return {
          title: 'Documents - Per Participant',
          description: 'Upload and manage documents for assigned participants',
          features: ['Upload participant documents', 'View assigned participant files', 'Session documentation', 'Photo uploads']
        };
      case 'support_coordinator':
        return {
          title: 'Documents - Per Participant',
          description: 'Manage documents for coordinated participants',
          features: ['Upload participant documents', 'Progress reports', 'Goal documentation', 'Plan management files']
        };
      case 'allied_health':
        return {
          title: 'Documents - Per Participant',
          description: 'Manage therapy and assessment documents',
          features: ['Upload therapy documents', 'Assessment reports', 'Treatment plans', 'Progress documentation']
        };
      default:
        return {
          title: 'Documents',
          description: 'Document management',
          features: []
        };
    }
  };

  const content = getDocumentContent();

  return (
    <AppLayout title="Documents">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-50">
            <Upload className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Folder className="h-5 w-5 text-purple-600" />
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Document features available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Document management features are under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Document upload, management, and role-based access controls will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Documents;
