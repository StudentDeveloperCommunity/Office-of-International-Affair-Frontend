import React from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import BaseForm from './BaseForm';

const NewsForm = ({
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

  const validateForm = () => {
    if (!formData.content || formData.content.length < 10) {
      toast.error('Content must be at least 10 characters long');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit News' : 'Add News'}
      description="Add or update news article details"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="News title"
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
                <SelectItem value="Announcement">Announcement</SelectItem>
                <SelectItem value="MoU">MoU</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
                <SelectItem value="Press Release">Press Release</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">Date *</label>
            <Input
              id="date"
              type="date"
              value={formData.date || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md border border-slate-200 p-3">
          <div>
            <p className="text-sm font-medium">Featured on Home Page</p>
            <p className="text-xs text-slate-500">Featured news appears on the home page carousel/section.</p>
          </div>
          <Switch
            checked={!!formData.isFeatured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: !!checked }))}
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium mb-1">Summary *</label>
          <Textarea
            id="summary"
            value={formData.summary || ''}
            onChange={handleChange}
            placeholder="Brief summary of the news"
            rows={3}
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content *</label>
          <Textarea
            id="content"
            value={formData.content || ''}
            onChange={handleChange}
            placeholder="Full content of the news article"
            rows={6}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl || ''}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
    </BaseForm>
  );
};

export default NewsForm;
