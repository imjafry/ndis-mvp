
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Calendar = () => {
  const { user } = useAuth();

  const getCalendarContent = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          title: 'Calendar - View All',
          description: 'Complete calendar overview of all activities',
          features: ['All participant sessions', 'Staff schedules', 'System reminders', 'Compliance deadlines']
        };
      case 'support_worker':
        return {
          title: 'Calendar - Upcoming Shifts',
          description: 'Your upcoming shifts and appointments',
          features: ['My scheduled sessions', 'Travel time', 'Participant notes', 'Session reminders']
        };
      case 'support_coordinator':
        return {
          title: 'Calendar - Progress Reviews',
          description: 'Progress review schedules and participant meetings',
          features: ['Progress review dates', 'Participant meetings', 'Goal review sessions', 'Report deadlines']
        };
      case 'allied_health':
        return {
          title: 'Calendar - Session Schedule',
          description: 'Your therapy and assessment sessions',
          features: ['Therapy sessions', 'Assessment appointments', 'Treatment planning', 'Progress evaluations']
        };
      default:
        return {
          title: 'Calendar',
          description: 'Schedule and appointments',
          features: []
        };
    }
  };

  const content = getCalendarContent();

  return (
    <AppLayout title="Calendar">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-blue-50">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Available Features</span>
            </CardTitle>
            <CardDescription>Features available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This feature is currently under development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The calendar functionality will include scheduling, reminders, and role-based calendar views.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;
