import React from 'react';
import { adminAPI } from '../services/api';
import FormPageTemplate from '../templates/FormPageTemplate';
import NewsForm from '../components/forms/NewsForm';

const NewsFormPage = () => {
  const defaultFormData = {
    title: '',
    category: '',
    summary: '',
    content: '',
    imageUrl: '',
    isFeatured: false,
    date: new Date().toISOString().split('T')[0],
    isPublished: true
  };

  // Transform data when loading from API
  const transformLoadData = (data) => ({
    ...data,
    date: data.date ? data.date.split('T')[0] : defaultFormData.date
  });

  // Transform data before submission
  const transformSubmitData = (data) => ({
    ...data,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
  });

  return (
    <FormPageTemplate
      title="News Article"
      defaultFormData={defaultFormData}
      formComponent={NewsForm}
      api={{
        get: adminAPI.getNewsById,
        create: adminAPI.createNews,
        update: adminAPI.updateNews
      }}
      transformLoadData={transformLoadData}
      transformSubmitData={transformSubmitData}
      successMessages={{
        create: 'News article created successfully',
        update: 'News article updated successfully',
        delete: 'News article deleted successfully'
      }}
      errorMessages={{
        load: 'Failed to load news article',
        create: 'Failed to create news article',
        update: 'Failed to update news article',
        delete: 'Failed to delete news article'
      }}
    />
  );
};

export default NewsFormPage;
