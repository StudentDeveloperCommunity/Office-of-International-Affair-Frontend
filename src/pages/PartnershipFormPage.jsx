import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import PartnershipForm from '../components/forms/PartnershipForm';

const PartnershipFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    partnerName: '',
    type: '',
    country: '',
    description: '',
    details: '',
    website: '',
    logoUrl: '',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0]
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load partnership data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadPartnership = async () => {
        try {
          const partnership = await adminAPI.getPartnershipById(id);
          // Format date for input field if needed
          const formattedData = {
            ...partnership,
            startDate: partnership.startDate ? partnership.startDate.split('T')[0] : ''
          };
          setFormData(formattedData);
        } catch (error) {
          console.error('Error loading partnership:', error);
          toast.error('Failed to load partnership data');
          navigate('/admin/dashboard');
        }
      };
      loadPartnership();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    
    try {
      if (isEditMode) {
        await adminAPI.updatePartnership(id, formData);
        toast.success('Partnership updated successfully');
      } else {
        await adminAPI.createPartnership(formData);
        toast.success('Partnership created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving partnership:', error);
      // Show detailed validation errors if available
      if (error.message.startsWith('Validation failed:')) {
        // Extract and show each validation error
        const errorMessages = error.message.replace('Validation failed: ', '').split('; ');
        errorMessages.forEach(msg => {
          toast.error(msg.trim(), { duration: 5000 });
        });
      } else {
        toast.error(error.message || 'Failed to save partnership');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <PartnershipForm
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

export default PartnershipFormPage;
