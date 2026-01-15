import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BaseForm from './BaseForm';

const ContactForm = ({
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
      title={isEdit ? 'Update Contact' : 'Add New Contact'}
      description="Manage contact information for the international office"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-1">Position *</label>
            <Input
              id="position"
              value={formData.position || ''}
              onChange={handleChange}
              placeholder="e.g., International Student Advisor"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1">Department</label>
          <Input
            id="department"
            value={formData.department || ''}
            onChange={handleChange}
            placeholder="e.g., International Student Services"
          />
        </div>

        <div>
          <label htmlFor="officeLocation" className="block text-sm font-medium mb-1">Office Location</label>
          <Input
            id="officeLocation"
            value={formData.officeLocation || ''}
            onChange={handleChange}
            placeholder="Building and room number"
          />
        </div>

        <div>
          <label htmlFor="officeHours" className="block text-sm font-medium mb-1">Office Hours</label>
          <Input
            id="officeHours"
            value={formData.officeHours || ''}
            onChange={handleChange}
            placeholder="e.g., Monday-Friday, 9:00 AM - 5:00 PM"
          />
        </div>

        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium mb-1">Responsibilities</label>
          <Textarea
            id="responsibilities"
            value={formData.responsibilities || ''}
            onChange={handleChange}
            placeholder="Key responsibilities or areas of expertise"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="order" className="block text-sm font-medium mb-1">Display Order</label>
            <Input
              id="order"
              type="number"
              min="0"
              value={formData.order || 0}
              onChange={handleChange}
              placeholder="Display order"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isPrimary || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isPrimary: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Primary Contact</span>
            </label>
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        </div>
      </div>
    </BaseForm>
  );
};

export default ContactForm;
