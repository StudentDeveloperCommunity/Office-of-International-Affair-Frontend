import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BaseForm from './BaseForm';

const PartnershipForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitting,
  isEdit = false
}) => {
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.partnerName?.trim()) {
      newErrors.partnerName = 'Partner name is required';
    } else if (formData.partnerName.length > 300) {
      newErrors.partnerName = 'Partner name must be 300 characters or less';
    }
    
    if (!formData.type) {
      newErrors.type = 'Please select a partnership type';
    }
    
    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 100) {
      newErrors.description = 'Description must be 100 characters or less';
    }
    
    if (!formData.details?.trim()) {
      newErrors.details = 'Details are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    if (validateForm()) {
      // Call the parent's onSubmit with the form data
      onSubmit(formData);
    }
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit Partnership' : 'Add Partnership'}
      description="Add or update partnership details"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="partnerName" className="block text-sm font-medium mb-1">Partner Name *</label>
          <Input
            id="partnerName"
            value={formData.partnerName || ''}
            onChange={handleChange}
            placeholder="Partner organization name"
            className={errors.partnerName ? 'border-red-500' : ''}
          />
          {errors.partnerName && (
            <p className="mt-1 text-sm text-red-600">{errors.partnerName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">Partnership Type *</label>
            <Select
              value={formData.type || ''}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, type: value }));
                if (errors.type) {
                  setErrors(prev => ({
                    ...prev,
                    type: undefined
                  }));
                }
              }}
              className={errors.type ? 'border-red-500' : ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strategic">Strategic</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Dual Degree">Dual Degree</SelectItem>
                <SelectItem value="Student Exchange">Student Exchange</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">Country *</label>
            <Input
              id="country"
              value={formData.country || ''}
              onChange={handleChange}
              placeholder="e.g., United States"
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Detailed description of the partnership (max 100 characters)"
            rows={4}
            className={errors.description ? 'border-red-500' : ''}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description ? (
              <p className="text-sm text-red-600">{errors.description}</p>
            ) : (
              <div className="text-xs text-gray-500">
                {formData.description?.length || 0}/100 characters
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-1">Website</label>
          <Input
            id="website"
            type="url"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder="https://partner-website.com"
          />
        </div>

        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium mb-1">Logo URL</label>
          <Input
            id="logoUrl"
            type="url"
            value={formData.logoUrl || ''}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />
        </div>
        
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">Details *</label>
          <Textarea
            id="details"
            value={formData.details || ''}
            onChange={handleChange}
            placeholder="Enter partnership details"
            rows={4}
            className={errors.details ? 'border-red-500' : ''}
          />
          {errors.details && (
            <p className="mt-1 text-sm text-red-600">{errors.details}</p>
          )}
        </div>
      </div>
    </BaseForm>
  );
};

export default PartnershipForm;
