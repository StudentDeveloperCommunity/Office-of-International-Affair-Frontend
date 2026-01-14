import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import TeamMemberForm from '../components/forms/TeamMemberForm';

const TeamMemberFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    bio: '',
    imageUrl: '',
    order: 0,
    isLeadership: false,
    isActive: true,
    imageFile: null
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // Load team member data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadTeamMember = async (id) => {
        try {
          const member = await adminAPI.getTeamMemberById(id);
          
          console.log('=== LOADING TEAM MEMBER DEBUG ===');
          console.log('Raw member data from API:', member);
          console.log('member.is_leadership:', member.is_leadership, 'type:', typeof member.is_leadership);
          console.log('member.is_active:', member.is_active, 'type:', typeof member.is_active);
          
          // Split the full name into first and last name
          const nameParts = (member.name || '').split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          console.log('Loading team member data:', member); // Debug log
          
          // Set form data with loaded member data
          setFormData({
            firstName: firstName,
            lastName: lastName,
            position: member.role || '',
            department: member.department || '',
            email: member.email || '',
            phone: member.phone || '',
            bio: member.bio || '',
            imageUrl: member.image || '',
            order: member.order || 0,
            isLeadership: member.is_leadership || false,
            isActive: member.is_active !== false, // Default to true if not specified
            imageFile: null
          });
          
          console.log('Form data set:', {
            firstName: firstName,
            lastName: lastName,
            position: member.role || '',
            imageUrl: member.image || ''
          }); // Debug log
          
          // Store original data for comparison
          setOriginalData({
            name: member.name || '',
            role: member.role || '',
            bio: member.bio || '',
            email: member.email || '',
            phone: member.phone || '',
            department: member.department || '',
            image: member.image || '',
            order: member.order || 0,
            is_leadership: member.is_leadership || false,
            isActive: member.is_active !== false
          });
        } catch (error) {
          console.error('Error loading team member:', error);
          toast.error('Failed to load team member data');
          navigate('/admin/team');
        }
      };
      loadTeamMember(id);
    }
  }, [id, isEditMode, navigate]);

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'position', 'bio'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (formData.bio && formData.bio.length < 10) {
      toast.error('Bio must be at least 10 characters long');
      return false;
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Handle image - simplified and more reliable logic
      if (formData.imageFile) {
        // New file uploaded - this takes precedence
        formDataToSend.append('file', formData.imageFile);
        console.log('New file uploaded, image will be replaced');
      } else {
        // No new file - check if we need to update/remove the existing image
        const currentImageUrl = formData.imageUrl || '';
        const originalImageUrl = originalData?.image || '';
        
        console.log('Image comparison:', {
          current: currentImageUrl,
          original: originalImageUrl,
          isEmpty: currentImageUrl === '',
          hasChanged: currentImageUrl !== originalImageUrl,
          formDataImageUrl: formData.imageUrl,
          originalDataImage: originalData?.image
        });
        
        if (currentImageUrl === '' && originalImageUrl !== '') {
          // User explicitly removed the image
          formDataToSend.append('image_url', '');
          console.log('Image removal detected - sending empty image_url');
        } else if (currentImageUrl !== '' && currentImageUrl !== originalImageUrl) {
          // User changed the image URL
          formDataToSend.append('image_url', currentImageUrl);
          console.log('Image URL changed:', currentImageUrl);
        } else {
          console.log('No image changes needed - current and original are the same');
        }
        // If image is the same as original, don't send anything to keep it unchanged
      }
      
      // Append other required fields
      const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
      
      console.log('=== BOOLEAN FIELD DEBUG ===');
      console.log('formData.isLeadership:', formData.isLeadership, 'type:', typeof formData.isLeadership);
      console.log('formData.isActive:', formData.isActive, 'type:', typeof formData.isActive);
      
      const currentData = {
        name: fullName,
        role: formData.position || '',
        bio: formData.bio || '',
        email: formData.email || '',
        phone: formData.phone || '',
        department: formData.department || '',
        order: formData.order ? parseInt(formData.order, 10) : 0,
        is_leadership: formData.isLeadership ? 'true' : 'false',
        is_active: formData.isActive !== false ? 'true' : 'false'
      };
      
      console.log('currentData.is_leadership:', currentData.is_leadership);
      console.log('currentData.is_active:', currentData.is_active);
      console.log('=== END BOOLEAN FIELD DEBUG ===');
      
      // Only append fields that have changed from original data
      Object.entries(currentData).forEach(([key, value]) => {
        const originalValue = originalData ? originalData[key] : null;
        
        // For boolean fields, always send them to ensure they're updated properly
        if (key === 'is_leadership' || key === 'is_active') {
          formDataToSend.append(key, value);
          console.log(`Sending boolean field ${key}: ${value}`);
        }
        // For required fields (name, role, bio), only append if they have content
        else if (['name', 'role', 'bio'].includes(key)) {
          if (value && value.trim() !== '') {
            formDataToSend.append(key, value);
          }
        }
        // For optional fields (department, email, phone), always send if they have content (regardless of change)
        else if (key === 'department' || key === 'email' || key === 'phone') {
          if (value && value.trim() !== '') {
            formDataToSend.append(key, value);
          }
          // Also send if the original had content but current is empty (to clear it)
          else if (originalValue && originalValue.trim() !== '') {
            // Send empty string to clear the field
            formDataToSend.append(key, '');
          }
          // If both are empty, don't send anything (field stays as is)
        }
        // For other fields (order), only append if they have changed
        else if (key === 'order') {
          if (value !== originalValue && value !== null && value !== undefined) {
            formDataToSend.append(key, value);
          }
        }
      });

      // Log the form data being sent (for debugging)
      console.log('Submitting team member form data:');
      console.log('Original data:', originalData);
      console.log('Current data:', currentData);
      console.log('formData.imageUrl:', formData.imageUrl);
      console.log('formData.imageFile:', formData.imageFile);
      console.log('originalData.image:', originalData?.image);
      
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value);
      }
      
      console.log('About to call API...');
      console.log('isEditMode:', isEditMode);
      console.log('id:', id);
      
      if (isEditMode) {
        console.log('Calling updateTeamMember API...');
        const result = await adminAPI.updateTeamMember(id, formDataToSend);
        console.log('API call completed successfully:', result);
        toast.success('Team member updated successfully');
      } else {
        console.log('Calling createTeamMember API...');
        const result = await adminAPI.createTeamMember(formDataToSend);
        console.log('API call completed successfully:', result);
        toast.success('Team member added successfully');
      }
      
      console.log('=== END FORM SUBMISSION DEBUG ===');
      
      // Wait a moment for the toast to show before navigating
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving team member:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      // Show more detailed error message from the backend if available
      let errorMessage = 'Failed to save team member';
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Special handling for image-related errors
      if (errorMessage.toLowerCase().includes('image') || 
          errorMessage.toLowerCase().includes('file') ||
          errorMessage.toLowerCase().includes('upload')) {
        errorMessage = `Image processing error: ${errorMessage}. Please try removing the image again or contact support.`;
      }
      
      toast.error(`Error: ${errorMessage}`);
      
      // If it's a validation error, don't navigate away
      if (error.response?.status === 400 || error.response?.status === 422) {
        console.log('Validation error - staying on page for user to fix');
        return;
      }
      
      // For other errors, navigate back after a delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <TeamMemberForm
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

export default TeamMemberFormPage;
