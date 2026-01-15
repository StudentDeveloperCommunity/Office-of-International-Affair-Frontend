import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import EventForm from '../components/forms/EventForm';

const EventFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
    location: '',
    category: '',
    registrationUrl: '',
    imageUrl: '',
    isPublished: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load event data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadEvent = async () => {
        try {
          const event = await adminAPI.getEventById(id);
          // Format dates for datetime-local input
          const formattedEvent = {
            ...event,
            startDate: event.startDate ? event.startDate.slice(0, 16) : '',
            endDate: event.endDate ? event.endDate.slice(0, 16) : ''
          };
          setFormData(formattedEvent);
        } catch (error) {
          console.error('Error loading event:', error);
          toast.error('Failed to load event data');
          navigate('/admin/dashboard');
        }
      };
      loadEvent();
    }
  }, [id, isEditMode, navigate]);

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'startDate', 'endDate', 'type'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (formData.description.length < 10) {
      toast.error('Description must be at least 10 characters long');
      return false;
    }
    
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error('End date must be after start date');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Format the data for the backend
      const eventData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        featured: formData.isFeatured || false,
        published: formData.isPublished !== false,
        // Add default values for required fields
        organizer: formData.organizer || 'OIA',
        status: formData.status || 'Scheduled',
      };
      
      // Only include optional fields if they have values
      if (formData.location && formData.location.trim() !== '') {
        eventData.location = formData.location;
      }
      if (formData.registrationUrl && formData.registrationUrl.trim() !== '') {
        eventData.registrationLink = formData.registrationUrl;
      }
      if (formData.imageUrl && formData.imageUrl.trim() !== '') {
        eventData.images = [formData.imageUrl]; // Events expect images array
      }
      
      if (isEditMode) {
        await adminAPI.updateEvent(id, eventData);
        toast.success('Event updated successfully');
      } else {
        await adminAPI.createEvent(eventData);
        toast.success('Event created successfully');
      }
      // Redirect to admin dashboard after successful submission
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         'Failed to save event';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <EventForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default EventFormPage;
