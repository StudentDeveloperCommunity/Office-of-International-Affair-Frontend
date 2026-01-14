import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import FAQForm from '../components/forms/FAQForm';

const FAQFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    order: 0,
    isFeatured: false,
    isActive: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load FAQ data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadFAQ = async () => {
        try {
          const faq = await adminAPI.getFAQById(id);
          setFormData({
            question: faq.question || '',
            answer: faq.answer || '',
            category: faq.category || 'general',
            order: faq.order || 0,
            isFeatured: faq.isFeatured || false,
            isActive: faq.isActive !== false // Default to true if not specified
          });
        } catch (error) {
          console.error('Error loading FAQ:', error);
          toast.error('Failed to load FAQ data');
          navigate('/admin/dashboard');
        }
      };
      loadFAQ();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (isEditMode) {
        await adminAPI.updateFAQ(id, formData);
        toast.success('FAQ updated successfully');
      } else {
        await adminAPI.createFAQ(formData);
        toast.success('FAQ created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast.error(error.response?.data?.message || 'Failed to save FAQ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <FAQForm
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

export default FAQFormPage;
