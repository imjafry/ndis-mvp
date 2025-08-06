
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChart, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Reports = () => {
  const { user } = useAuth();

  const getReportContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          title: 'Reports & Exports - Global Reports',
          description: 'Complete reporting and analytics',
          features: ['Global system reports', 'Financial reports', 'Staff performance reports', 'Compliance reports', 'Custom report builder', 'Data exports']
        };
      case 'support_worker':
        return {
          title: 'Reports - Personal Invoices',
          description: 'Your personal invoice and session reports',
          features: ['Personal invoice reports', 'Session summary reports', 'Time tracking reports', 'Personal performance metrics']
        };
      case 'support_coordinator':
        return {
          title: 'Reports - Participant Reports',
          description: 'Reports for participants under your coordination',
          features: ['Participant progress reports', 'Goal achievement reports', 'Plan utilization reports', 'Coordination summaries']
        };
      case 'allied_health':
        return {
          title: 'Reports - Progress Summaries',
          description: 'Therapy progress and outcome reports',
          features: ['Progress summaries', 'Treatment outcome reports', 'Assessment reports', 'Therapy session analytics']
        };
      default:
        return {
          title: 'Reports',
          description: 'Reporting and analytics',
          features: []
        };
    }
  };

  const content = getReportContent();

  return (
    <AppLayout title="Reports">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-orange-50">
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-orange-600" />
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Reporting features available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Advanced reporting features are under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Comprehensive reporting system with analytics, exports, and role-based report generation.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;
