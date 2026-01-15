import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import ContactForm from '../components/forms/ContactForm';

const ContactFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    department: '',
    officeLocation: '',
    officeHours: '',
    responsibilities: '',
    order: 0,
    isPrimary: false,
    isActive: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load contact data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadContact = async () => {
        try {
          const contact = await adminAPI.getContactById(id);
          setFormData({
            name: contact.name || '',
            position: contact.position || '',
            email: contact.email || '',
            phone: contact.phone || '',
            department: contact.department || '',
            officeLocation: contact.officeLocation || '',
            officeHours: contact.officeHours || '',
            responsibilities: contact.responsibilities || '',
            order: contact.order || 0,
            isPrimary: contact.isPrimary || false,
            isActive: contact.isActive !== false // Default to true if not specified
          });
        } catch (error) {
          console.error('Error loading contact:', error);
          toast.error('Failed to load contact data');
          navigate('/admin/dashboard');
        }
      };
      loadContact();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (isEditMode) {
        await adminAPI.updateContact(id, formData);
        toast.success('Contact updated successfully');
      } else {
        await adminAPI.createContact(formData);
        toast.success('Contact created successfully');
      }
      navigate('/admin/contacts');
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error(error.response?.data?.message || 'Failed to save contact');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/contacts');
  };

  return (
    <div className="container mx-auto p-6">
      <ContactForm
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

export default ContactFormPage;
