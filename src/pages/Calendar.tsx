
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight,
  Clock, MapPin, User, Phone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CalendarEvent {
  id: string;
  title: string;
  participantName: string;
  staffName: string;
  date: string;
  time: string;
  duration: number;
  type: 'personal_care' | 'community_access' | 'allied_health' | 'assessment' | 'meeting';
  location: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Mock events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Personal Care Session',
      participantName: 'John Smith',
      staffName: 'Mike Chen',
      date: '2024-01-15',
      time: '09:00',
      duration: 3,
      type: 'personal_care',
      location: '123 Main St, Melbourne',
      status: 'confirmed',
      notes: 'Regular morning routine support'
    },
    {
      id: '2',
      title: 'Community Shopping',
      participantName: 'Sarah Johnson',
      staffName: 'Emma Davis',
      date: '2024-01-15',
      time: '14:00',
      duration: 2,
      type: 'community_access',
      location: 'Westfield Shopping Center',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'OT Assessment',
      participantName: 'Michael Brown',
      staffName: 'Dr. Alex Thompson',
      date: '2024-01-16',
      time: '10:00',
      duration: 1.5,
      type: 'allied_health',
      location: 'Clinic Room 2',
      status: 'confirmed',
      notes: 'Initial occupational therapy assessment'
    }
  ];

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'personal_care': return 'bg-blue-100 text-blue-800';
      case 'community_access': return 'bg-green-100 text-green-800';
      case 'allied_health': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-orange-100 text-orange-800';
      case 'meeting': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const todayEvents = getEventsForDate(new Date());
  const selectedDateEvents = getEventsForDate(selectedDate);
  const days = getDaysInMonth(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <AppLayout title="Calendar View">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Calendar View</h1>
            <p className="text-muted-foreground">Manage appointments and schedule services</p>
          </div>
          <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
                <DialogDescription>
                  Schedule a new appointment or service session
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-500">Appointment scheduling form will be implemented here...</p>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsEventDialogOpen(false)}>
                    Create Appointment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>{getMonthName(currentDate)}</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-2 h-20"></div>;
                  }
                  
                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`p-2 h-20 border rounded cursor-pointer hover:bg-gray-50 ${
                        isToday ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                      } ${
                        isSelected ? 'bg-blue-100 border-blue-300' : ''
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                          >
                            {event.time} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Today's Events / Selected Date Events */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Events for ${selectedDate.toLocaleDateString()}`
                  : "Today's Events"
                }
              </CardTitle>
              <CardDescription>
                {selectedDate 
                  ? `${selectedDateEvents.length} event(s)`
                  : `${todayEvents.length} event(s) today`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(selectedDate ? selectedDateEvents : todayEvents).map(event => (
                  <div key={event.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{event.participantName}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.time} ({event.duration}h)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>Staff: {event.staffName}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="secondary" className={getEventTypeColor(event.type)}>
                        {event.type.replace('_', ' ')}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {event.notes && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                        <p className="font-medium text-gray-700">Notes:</p>
                        <p className="text-gray-600">{event.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {(selectedDate ? selectedDateEvents : todayEvents).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No events scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming This Week</CardTitle>
            <CardDescription>Next 7 days overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.slice(0, 6).map(event => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{event.participantName}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{event.time}</span>
                    <span>{event.duration}h</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;
