import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BaseForm from './BaseForm';

const FAQForm = ({
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
      title={isEdit ? 'Edit FAQ' : 'Add FAQ'}
      description="Add or update frequently asked question"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium mb-1">Question *</label>
          <Input
            id="question"
            value={formData.question || ''}
            onChange={handleChange}
            placeholder="Enter the question"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium mb-1">Answer *</label>
          <Textarea
            id="answer"
            value={formData.answer || ''}
            onChange={handleChange}
            placeholder="Enter the answer"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category *</label>
            <Select
              value={formData.category || ''}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Admissions">Admissions</SelectItem>
                <SelectItem value="Mobility">Mobility</SelectItem>
                <SelectItem value="Visas">Visas</SelectItem>
                <SelectItem value="Partnerships">Partnerships</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium mb-1">Display Order</label>
            <Input
              id="order"
              type="number"
              min="0"
              value={formData.order || 0}
              onChange={handleChange}
              placeholder="Display order (lower numbers first)"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isFeatured || false}
              onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Featured FAQ (shows in featured section)</span>
          </label>
        </div>
      </div>
    </BaseForm>
  );
};

export default FAQForm;
