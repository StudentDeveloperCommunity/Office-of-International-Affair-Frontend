import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Image as ImageIcon, X } from 'lucide-react';
import BaseForm from './BaseForm';

const TeamMemberForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitting,
  isEdit = false
}) => {
  const [previewUrl, setPreviewUrl] = useState(() => {
    // Set initial preview URL with full path construction
    let imageUrl = formData.imageUrl || '';
    if (imageUrl && !imageUrl.startsWith('http')) {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
      imageUrl = `${baseUrl}${imageUrl}`;
    }
    return imageUrl;
  });
  const [showUrlInput, setShowUrlInput] = useState(!!formData.imageUrl);

  // Update previewUrl when formData.imageUrl changes
  React.useEffect(() => {
    if (!formData.imageUrl) {
      setPreviewUrl('');
      setShowUrlInput(false);
      return;
    }
    
    // If it's a data URL (from file upload), use it directly
    if (formData.imageUrl.startsWith('data:')) {
      setPreviewUrl(formData.imageUrl);
      setShowUrlInput(false); // Hide URL input for file uploads
      return;
    }
    
    // Construct full URL if it's a relative path
    let imageUrl = formData.imageUrl;
    if (!imageUrl.startsWith('http')) {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
      imageUrl = `${baseUrl}${imageUrl}`;
    }
    
    // Add cache-busting timestamp to prevent caching issues
    setPreviewUrl(`${imageUrl}?t=${Date.now()}`);
    setShowUrlInput(true); // Show URL input for URL-based images
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    if (id === 'imageUrl') {
      setPreviewUrl(value);
      // If user starts typing in URL field, keep the input visible
      if (value && value.trim()) {
        setShowUrlInput(true);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        e.target.value = ''; // Reset the file input
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        e.target.value = ''; // Reset the file input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData(prev => ({
          ...prev,
          imageFile: file, // Store the actual File object
          imageUrl: reader.result // Store data URL for preview
        }));
        setShowUrlInput(false); // Hide URL input when file is uploaded
      };
      reader.onerror = () => {
        console.error('Error reading file');
        alert('Error reading file. Please try another image.');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl('');
    setFormData(prev => {
      const newData = {
        ...prev,
        imageFile: null,
        imageUrl: ''
      };
      return newData;
    });
    setShowUrlInput(false); // Hide URL input when image is removed
    
    // Reset file input
    const fileInput = document.getElementById('imageFile');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const triggerFileInput = () => {
    document.getElementById('imageFile').click();
  };
  
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit Team Member' : 'Add Team Member'}
      description="Add or update team member details"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Profile Photo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="h-32 w-32 mx-auto rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mt-2 text-xs text-green-600">Image loaded - Click X to remove</div>
                </div>
              ) : (
                <>
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imageFile"
                      className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-3 py-2 border border-indigo-600 rounded-md hover:bg-indigo-50"
                    >
                      <span>Upload a file</span>
                      <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  {formData.imageUrl === '' && <div className="mt-2 text-xs text-orange-600 font-semibold">Image will be removed on save</div>}
                </>
              )}
            </div>
          </div>
          
          {/* Show URL input section when there's an image URL (but not for file uploads) */}
          {formData.imageUrl && !formData.imageUrl.startsWith('data:') && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 text-center">
                Image URL:
              </p>
              <div className="mt-1">
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="https://example.com/photo.jpg"
                  readOnly
                />
              </div>
            </div>
          )}
          
          {/* Show "Add URL" button when there's no image and URL input is hidden */}
          {!previewUrl && !formData.imageUrl && !showUrlInput && (
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={() => setShowUrlInput(true)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Image URL Instead
              </button>
            </div>
          )}
          
          {/* Show URL input when user clicks "Add Image URL Instead" */}
          {showUrlInput && !formData.imageUrl && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 text-center">
                Enter image URL:
              </p>
              <div className="mt-1">
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="https://example.com/photo.jpg"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
            <Input
              id="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
            <Input
              id="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-1">Position *</label>
            <Input
              id="position"
              value={formData.position || ''}
              onChange={handleChange}
              placeholder="e.g., Director, Coordinator"
              minLength={1}
              maxLength={200}
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium mb-1">Department *</label>
            <Input
              id="department"
              value={formData.department || ''}
              onChange={handleChange}
              placeholder="e.g., International Office"
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
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="bio" className="block text-sm font-medium">Bio *</label>
            <span className="text-xs text-gray-500">
              {formData.bio?.length || 0}/10+ characters
            </span>
          </div>
          <Textarea
            id="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Brief bio about the team member (minimum 10 characters)"
            rows={4}
            minLength={10}
            maxLength={1000}
            className={formData.bio && formData.bio.length < 10 ? 'border-red-500' : ''}
            required
          />
          {formData.bio && formData.bio.length < 10 && (
            <p className="mt-1 text-sm text-red-600">Bio must be at least 10 characters long</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="order" className="block text-sm font-medium mb-1">Display Order</label>
            <Input
              id="order"
              type="number"
              min="0"
              value={formData.order || ''}
              onChange={handleChange}
              placeholder="Display order (lower numbers first)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="isLeadership" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isLeadership"
                checked={!!formData.isLeadership}
                onChange={(e) => {
                  console.log('Leadership checkbox clicked:', e.target.checked);
                  setFormData(prev => ({ ...prev, isLeadership: e.target.checked }));
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Leadership Team</span>
            </label>
          </div>
          <div>
            <label htmlFor="isActive" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={!!formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active Member</span>
            </label>
          </div>
        </div>
      </div>
    </BaseForm>
  );
};

export default TeamMemberForm;
