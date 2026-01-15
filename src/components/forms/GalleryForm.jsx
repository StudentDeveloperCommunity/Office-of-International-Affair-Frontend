import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Image as ImageIcon, X } from 'lucide-react';
import BaseForm from './BaseForm';

const GalleryForm = ({
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
  useEffect(() => {
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
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
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

  const triggerFileInput = () => {
    document.getElementById('imageFile').click();
  };

  const removeImage = () => {
    setPreviewUrl('');
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      imageUrl: ''
    }));
    setShowUrlInput(false); // Hide URL input when image is removed
    // Reset file input
    if (document.getElementById('imageFile')) {
      document.getElementById('imageFile').value = '';
    }
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit Gallery Item' : 'Add to Gallery'}
      description="Upload and manage gallery images"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image *</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-md"
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
                  {isEdit && !previewUrl && !formData.imageUrl && (
                    <div className="mt-2 text-xs text-orange-600 font-semibold">Image will be removed on save</div>
                  )}
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
                  placeholder="https://example.com/image.jpg"
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
                  placeholder="https://example.com/image.jpg"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Image title"
            maxLength={200}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Brief description of the image"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category *</label>
            <select
              id="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              required
            >
              <option value="">Select a category</option>
              <option value="Events">Events</option>
              <option value="Campus">Campus</option>
              <option value="Partnerships">Partnerships</option>
              <option value="Cultural">Cultural</option>
              <option value="Delegations">Delegations</option>
            </select>
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
            <span className="text-sm font-medium text-gray-700">Featured Image (shows in featured section)</span>
          </label>
        </div>
      </div>
    </BaseForm>
  );
};

export default GalleryForm;
