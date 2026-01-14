import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BaseForm from './BaseForm';

// Event types from the backend model
type EventType = 'Visit' | 'Conference' | 'Seminar' | 'Workshop' | 'Webinar' | 'Other';

const EventForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitting,
  isEdit = false
}) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit Event' : 'Add Event'}
      description="Add or update event details"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Event Title *</label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Event title"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date *</label>
            <Input
              id="startDate"
              type="datetime-local"
              value={formData.startDate || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date *</label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Location *</label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Event location"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category *</label>
          <Select
            value={formData.type || ''}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Visit">Campus Visit</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Seminar">Seminar</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
          <Textarea
            id="description"
            minLength={10}
            maxLength={2000}
            required
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Detailed event description"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="registrationUrl" className="block text-sm font-medium mb-1">Registration URL</label>
          <Input
            id="registrationUrl"
            type="url"
            value={formData.registrationUrl || ''}
            onChange={handleChange}
            placeholder="https://example.com/register"
            pattern="https?://.+"
          />
          <p className="mt-1 text-xs text-gray-500">Must be a valid URL starting with http:// or https://</p>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl || ''}
            onChange={handleChange}
            placeholder="https://example.com/event-image.jpg"
          />
        </div>
      </div>
    </BaseForm>
  );
};

export default EventForm;
