import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import NewsForm from '../components/forms/NewsForm';

const NewsFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    content: '',
    imageUrl: '',
    isFeatured: false,
    isPublished: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load news data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadNews = async () => {
        try {
          const newsItem = await adminAPI.getNewsById(id);
          // Format date for input field
          const formattedNews = {
            ...newsItem,
            imageUrl: newsItem.image || newsItem.imageUrl || '',
            isFeatured: !!newsItem.featured,
            date: newsItem.date ? newsItem.date.split('T')[0] : ''
          };
          setFormData(formattedNews);
        } catch (error) {
          console.error('Error loading news:', error);
          toast.error('Failed to load news data');
          navigate('/admin/dashboard');
        }
      };
      loadNews();
    }
  }, [id, isEditMode, navigate]);

  const toBackendNewsPayload = (data) => {
    const payload = {
      title: data.title,
      category: data.category,
      content: data.content,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      featured: !!data.isFeatured,
    };
    
    // Only include image if it has a value
    if (data.imageUrl && data.imageUrl.trim() !== '') {
      payload.image = data.imageUrl;
    }
    
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = toBackendNewsPayload(formData);
      if (isEditMode) {
        await adminAPI.updateNews(id, payload);
        toast.success('News updated successfully');
      } else {
        await adminAPI.createNews(payload);
        toast.success('News created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error(error.response?.data?.message || 'Failed to save news');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <NewsForm
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

export default NewsFormPage;
