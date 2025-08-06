
import React, { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, MapPin, Upload, Save, User, 
  FileText, Camera, Paperclip, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const SessionLogEntry = () => {
  const [formData, setFormData] = useState({
    participant: '',
    service: '',
    startTime: '',
    endTime: '',
    kilometers: '',
    notes: '',
    outcomes: '',
    nextSteps: '',
    participantMood: '',
    challenges: '',
    achievements: ''
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const participants = [
    { id: 'p1', name: 'John Smith', ndis: 'NDIS123456789' },
    { id: 'p2', name: 'Emma Wilson', ndis: 'NDIS987654321' },
    { id: 'p3', name: 'Michael Brown', ndis: 'NDIS456789123' }
  ];

  const serviceTypes = [
    'Daily Living Skills',
    'Community Access',
    'Personal Care',
    'Transport',
    'Social Participation',
    'Capacity Building',
    'Therapeutic Support'
  ];

  const moodOptions = [
    'Excellent',
    'Good',
    'Neutral',
    'Challenging',
    'Difficult'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachedFiles(prev => [...prev, ...Array.from(files)]);
      toast.success(`${files.length} file(s) attached`);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      const diff = end.getTime() - start.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.participant || !formData.service || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    console.log('Session log data:', formData);
    console.log('Attached files:', attachedFiles);
    toast.success('Session log saved successfully!');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved');
  };

  return (
    <AppLayout title="Log Session">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Session Log Entry</span>
            </CardTitle>
            <CardDescription>
              Record participant session details and outcomes
            </CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="participant">Participant *</Label>
                  <Select value={formData.participant} onValueChange={(value) => handleInputChange('participant', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select participant" />
                    </SelectTrigger>
                    <SelectContent>
                      {participants.map((participant) => (
                        <SelectItem key={participant.id} value={participant.id}>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              <div className="text-xs text-gray-500">{participant.ndis}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-10"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="endTime"
                      type="time"
                      className="pl-10"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                    <Badge variant="outline" className="text-sm">
                      {calculateDuration() || 'Auto calculated'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometers">Travel Distance (KM)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="kilometers"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    className="pl-10"
                    value={formData.kilometers}
                    onChange={(e) => handleInputChange('kilometers', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Notes & Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="participantMood">Participant Mood</Label>
                <Select value={formData.participantMood} onValueChange={(value) => handleInputChange('participantMood', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Session Notes *</Label>
                <Textarea
                  id="notes"
                  placeholder="Describe what happened during the session, activities completed, participant engagement..."
                  className="min-h-[120px]"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea
                    id="achievements"
                    placeholder="What did the participant achieve today?"
                    className="min-h-[100px]"
                    value={formData.achievements}
                    onChange={(e) => handleInputChange('achievements', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges Faced</Label>
                  <Textarea
                    id="challenges"
                    placeholder="Any difficulties or challenges encountered?"
                    className="min-h-[100px]"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextSteps">Recommendations/Next Steps</Label>
                <Textarea
                  id="nextSteps"
                  placeholder="What should be focused on in the next session?"
                  className="min-h-[80px]"
                  value={formData.nextSteps}
                  onChange={(e) => handleInputChange('nextSteps', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Paperclip className="h-5 w-5" />
                <span>Attachments</span>
              </CardTitle>
              <CardDescription>
                Upload photos, documents, or other relevant files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <Button type="button" variant="outline" onClick={() => document.getElementById('camera-upload')?.click()}>
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>

                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileAttachment}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                
                <input
                  id="camera-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileAttachment}
                  accept="image/*"
                  capture="environment"
                />

                {attachedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Attached Files ({attachedFiles.length})</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {attachedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {(file.size / 1024 / 1024).toFixed(1)}MB
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                  <div>
                    <p>Required fields marked with *</p>
                    <p>Ensure all information is accurate before submitting.</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={handleSaveDraft}>
                    Save Draft
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Submit Session Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
};

export default SessionLogEntry;
