import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const EnhancedProgramForm = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel, 
  submitting, 
  editingProgram 
}) => {
  const [errors, setErrors] = useState({});
  
  const handleArrayChange = (fieldName, value) => {
    const arrayValue = value.split('\n').filter(item => item.trim() !== '');
    setFormData({
      ...formData,
      [fieldName]: arrayValue
    });
  };

  const getArrayAsText = (arrayField) => {
    return Array.isArray(arrayField) ? arrayField.join('\n') : '';
  };

  // Field validation rules based on backend requirements
  const validations = {
    // Required fields with max lengths from backend
    title: { 
      required: true,
      maxLength: 200, 
      message: 'Title must be between 1-200 characters',
      minLength: 1
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 2000,
      message: 'Description must be between 10-2000 characters'
    },
    partnerUniversity: { 
      required: true,
      maxLength: 200, 
      message: 'University name must be between 1-200 characters',
      minLength: 1
    },
    
    // Optional fields with max lengths
    duration: { 
      required: false,
      maxLength: 50, 
      message: 'Duration must be 50 characters or less' 
    },
    programType: { 
      required: false,
      maxLength: 100, 
      message: 'Program type must be 100 characters or less' 
    },
    degreeLevel: { 
      required: false,
      maxLength: 100, 
      message: 'Degree level must be 100 characters or less' 
    },
    location: { 
      required: false,
      maxLength: 100, 
      message: 'Location must be 100 characters or less' 
    },
    language: { 
      required: false,
      maxLength: 50, 
      message: 'Language must be 50 characters or less' 
    },
    applicationLink: {
      required: true,
      isUrl: true,
      message: 'Please enter a valid application URL (e.g., https://example.com/apply)',
      maxLength: 500
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let hasErrors = false;

    // Validate each field based on its rules
    Object.entries(validations).forEach(([field, rules]) => {
      const value = formData[field] || '';
      const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      
      // Check required fields
      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = `${fieldName} is required`;
        hasErrors = true;
        return;
      }
      
      // Check min length
      if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = rules.message || `${fieldName} must be at least ${rules.minLength} characters`;
        hasErrors = true;
        return;
      }
      
      // Check max length
      if (rules.maxLength && value && value.length > rules.maxLength) {
        newErrors[field] = rules.message || `${fieldName} must be ${rules.maxLength} characters or less`;
        hasErrors = true;
        return;
      }
      
      // URL validation
      if (rules.isUrl && value && !isValidUrl(value)) {
        newErrors[field] = rules.message || 'Please enter a valid URL';
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    
    // If there are errors, scroll to the first one
    if (hasErrors) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
    
    return !hasErrors;
  };

  // Validate single field
  const validateField = (name, value) => {
    if (!validations[name]) return;
    
    const fieldErrors = { ...errors };
    const { maxLength, message } = validations[name];
    
    if (value.length > maxLength) {
      fieldErrors[name] = message;
    } else {
      delete fieldErrors[name];
    }
    
    setErrors(fieldErrors);
  };

  // Helper function to validate URLs
  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      // Check if URL starts with http:// or https://
      if (!url.match(/^https?:\/\//)) {
        return false;
      }
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Update the form data
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear the error for this field when user types
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    
    // Re-validate URL fields
    if (id === 'applicationLink' && value && !isValidUrl(value)) {
      setErrors(prev => ({
        ...prev,
        [id]: 'Please enter a valid URL starting with http:// or https://'
      }));
    }
  };
  
  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // First, validate the form
    if (!validateForm()) {
      console.log('Form validation failed', errors);
      toast.error('Please fix the validation errors before submitting');
      return;
    }
    
    // Create a sanitized copy of form data
    const sanitizedData = { ...formData };
    const newErrors = {};
    
    // Sanitize all string fields to ensure they don't exceed backend limits
    const sanitizeField = (value, maxLength = 200) => {
      if (typeof value === 'string') {
        // Trim whitespace and truncate to maxLength characters
        return value.trim().substring(0, maxLength);
      } else if (Array.isArray(value)) {
        // Handle array fields (like eligibility, scholarships, etc.)
        return value.map(item => 
          typeof item === 'string' ? item.trim().substring(0, 200) : item
        );
      } else if (value && typeof value === 'object' && !(value instanceof Date)) {
        // Handle nested objects if any (but not Date objects)
        const sanitizedObj = {};
        Object.keys(value).forEach(k => {
          sanitizedObj[k] = sanitizeField(value[k]);
        });
        return sanitizedObj;
      }
      return value;
    };
    
    // Apply sanitization to all fields
    Object.keys(sanitizedData).forEach(key => {
      sanitizedData[key] = sanitizeField(sanitizedData[key]);
    });
    
    // Validate required fields after sanitization
    if (!sanitizedData.partnerUniversity || sanitizedData.partnerUniversity.trim() === '') {
      newErrors.partnerUniversity = 'University name is required';
    }
    
    if (!sanitizedData.duration || sanitizedData.duration.trim() === '') {
      newErrors.duration = 'Duration is required';
    } else if (sanitizedData.duration.length > 20) {
      newErrors.duration = 'Duration must be 20 characters or less';
    }
    
    if (!sanitizedData.deadline || sanitizedData.deadline.trim() === '') {
      newErrors.deadline = 'Deadline is required';
    }
    
    // Additional required fields validation
    if (!sanitizedData.title || sanitizedData.title.trim() === '') {
      newErrors.title = 'Title is required';
    }
    
    if (!sanitizedData.programType || sanitizedData.programType.trim() === '') {
      newErrors.programType = 'Program type is required';
    }
    
    // If there are validation errors, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorField = Object.keys(newErrors)[0];
      console.log('First error field:', firstErrorField);
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
        // Add error class to highlight the field
        element.classList.add('border-red-500');
      }
      toast.error('Please fix the validation errors');
      return;
    }
    
    try {
      console.log('Submitting form with data:', sanitizedData);
      
      // Sanitize all fields before submission
      Object.keys(validations).forEach(field => {
        if (sanitizedData[field] && typeof sanitizedData[field] === 'string') {
          // Trim whitespace
          sanitizedData[field] = sanitizedData[field].trim();
          // Truncate to max length
          const { maxLength } = validations[field];
          if (sanitizedData[field].length > maxLength) {
            sanitizedData[field] = sanitizedData[field].substring(0, maxLength);
          }
        }
      });
      
      // Update form data with sanitized values
      setFormData(sanitizedData);
      
      // Call the parent onSubmit with the sanitized data
      if (typeof onSubmit === 'function') {
        await onSubmit(e, sanitizedData);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle specific error cases
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        
        // Handle validation errors from the server
        if (error.response.status === 422 && error.response.data.detail) {
          const errorDetails = error.response.data.detail;
          if (Array.isArray(errorDetails)) {
            // Handle field-specific validation errors
            const fieldErrors = {};
            errorDetails.forEach(detail => {
              const field = detail.loc[detail.loc.length - 1];
              fieldErrors[field] = detail.msg;
            });
            setErrors(fieldErrors);
            toast.error('Please fix the validation errors');
          } else {
            toast.error(errorDetails);
          }
        } else if (error.response.status === 401) {
          // Handle unauthorized (token expired)
          toast.error('Your session has expired. Please log in again.');
          // Redirect to login or refresh token
        } else {
          // Other server errors
          toast.error(error.response.data.message || 'Failed to save program');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        toast.error(`Error: ${error.message}`);
      }
      
      // Re-throw the error to be handled by the parent component
      throw error;
    }
  };

    // Main component render
  // Log form data and errors for debugging
  console.log('Form data:', formData);
  console.log('Form errors:', errors);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Enhanced Details</TabsTrigger>
          <TabsTrigger value="costs">Costs & Support</TabsTrigger>
          <TabsTrigger value="university">University Info</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Program Information</CardTitle>
              <CardDescription>Essential program details that appear on program cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program Title *</label>
                <div>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Engineering Exchange - Technical University Munich"
                    disabled={submitting}
                    maxLength={50}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.title?.length || 0}/50 characters
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Partner University *</label>
                <div>
                  <Input
                    id="partnerUniversity"
                    required
                    value={formData.partnerUniversity}
                    onChange={handleChange}
                    placeholder="e.g., Technical University Munich, Germany"
                    disabled={submitting}
                    maxLength={50}
                    className={errors.partnerUniversity ? 'border-red-500' : ''}
                  />
                  {errors.partnerUniversity && (
                    <p className="mt-1 text-sm text-red-600">{errors.partnerUniversity}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.partnerUniversity?.length || 0}/50 characters
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Program Type *</label>
                  <Select
                    value={formData.programType || ''}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, programType: value }));
                      if (errors.programType) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.programType;
                          return newErrors;
                        });
                      }
                    }}
                  >
                    <SelectTrigger className={errors.programType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select program type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Exchange">Student Exchange</SelectItem>
                      <SelectItem value="StudyAbroad">Study Abroad</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="ShortTerm">Short-term Program</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.programType && (
                    <p className="mt-1 text-sm text-red-600">{errors.programType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration *</label>
                  <Input
                    id="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 1 Semester (4 months)"
                    disabled={submitting}
                    className={errors.duration ? 'border-red-500' : ''}
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Application Deadline *</label>
                  <Input
                    id="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="e.g., March 15, 2025"
                    disabled={submitting}
                    className={errors.deadline ? 'border-red-500' : ''}
                  />
                  {errors.deadline && (
                    <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Basic Eligibility Criteria *</label>
                <Input
                  id="eligibility"
                  required
                  value={formData.eligibility}
                  onChange={handleChange}
                  placeholder="e.g., 3rd/4th year Engineering students with CGPA ≥ 7.5"
                  disabled={submitting}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Application Link *
                  <span className="text-xs text-slate-500 ml-1">(Required)</span>
                </label>
                <Input
                  id="applicationLink"
                  type="url"
                  required
                  value={formData.applicationLink || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/apply"
                  disabled={submitting}
                  className={errors.applicationLink ? 'border-red-500' : ''}
                />
                {errors.applicationLink && (
                  <p className="mt-1 text-sm text-red-600">{errors.applicationLink}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter the full URL where students can apply
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program Description *</label>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  disabled={submitting}
                  maxLength={2000}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.description?.length || 0}/2000 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purpose & Benefits</CardTitle>
              <CardDescription>Detailed program information for the program detail page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program Purpose</label>
                <Textarea
                  id="purpose"
                  rows={3}
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Describe the main purpose and goals of this exchange program..."
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program Vision</label>
                <Textarea
                  id="vision"
                  rows={2}
                  value={formData.vision}
                  onChange={handleChange}
                  placeholder="Vision statement for the program..."
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Benefits for Students 
                  <span className="text-xs text-slate-500">(One benefit per line)</span>
                </label>
                <Textarea
                  rows={6}
                  value={getArrayAsText(formData.benefits)}
                  onChange={(e) => handleArrayChange('benefits', e.target.value)}
                  placeholder="Credit Transfer: All academic credits earned abroad will be transferred
International Exposure: Experience different teaching methodologies
Career Impact: Enhanced employability with international experience
Cultural Learning: Deep immersion in different cultures"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Detailed Eligibility Criteria 
                  <span className="text-xs text-slate-500">(One criterion per line)</span>
                </label>
                <Textarea
                  rows={5}
                  value={getArrayAsText(formData.eligibilityDetailed)}
                  onChange={(e) => handleArrayChange('eligibilityDetailed', e.target.value)}
                  placeholder="Academic Performance: Maintain required CGPA/percentage
Language Proficiency: English proficiency may be required
Financial Capability: Demonstrate ability to cover program costs
Health Requirements: Medical clearance and insurance coverage"
                  disabled={submitting}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Costs & Support Tab */}
        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Cost breakdown and scholarship information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tuition Fee</label>
                  <Input
                    id="tuitionFee"
                    value={formData.tuitionFee}
                    onChange={handleChange}
                    placeholder="e.g., €1,500 per semester"
                    disabled={submitting}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Travel Costs</label>
                  <Input
                    id="travel"
                    value={formData.travel}
                    onChange={handleChange}
                    placeholder="e.g., ₹40,000 - ₹1,20,000 (round trip airfare)"
                    disabled={submitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Scholarships 
                  <span className="text-xs text-slate-500">(One scholarship per line)</span>
                </label>
                <Textarea
                  rows={4}
                  value={getArrayAsText(formData.scholarships)}
                  onChange={(e) => handleArrayChange('scholarships', e.target.value)}
                  placeholder={`Medi-Caps Merit Scholarship: Up to 50% tuition fee waiver
International Exchange Grant: ₹1,00,000 financial assistance
Need-based Support: Financial aid based on family income`}
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Accommodation Options 
                  <span className="text-xs text-slate-500">(One option per line)</span>
                </label>
                <Textarea
                  rows={4}
                  value={getArrayAsText(formData.accommodation)}
                  onChange={(e) => handleArrayChange('accommodation', e.target.value)}
                  placeholder="University Hostels: On-campus accommodation with facilities
Homestay Programs: Live with local families for cultural immersion
Shared Apartments: Cost-effective option with other students
Private Accommodation: Independent housing options near campus"
                  disabled={submitting}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* University Information Tab */}
        <TabsContent value="university" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partner University Details</CardTitle>
              <CardDescription>Information about the partner university</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Founded Year</label>
                  <Input
                    id="universityFounded"
                    value={formData.universityFounded}
                    onChange={handleChange}
                    placeholder="e.g., 1868"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Global Ranking</label>
                  <Input
                    id="universityRanking"
                    value={formData.universityRanking}
                    onChange={handleChange}
                    placeholder="e.g., Top 50 Global Engineering Universities"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Campus Information</label>
                <Input
                  id="campusInfo"
                  value={formData.campusInfo}
                  onChange={handleChange}
                  placeholder="e.g., 600 hectares, Modern facilities"
                  disabled={submitting}
                />
              </div>
                            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Student Community</label>
                <Input
                  id="studentBody"
                  value={formData.studentBody}
                  onChange={handleChange}
                  placeholder="e.g., 45,000+ students from 120+ countries"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  University Specializations 
                  <span className="text-xs text-slate-500">(One specialty per line)</span>
                </label>
                <Textarea
                  rows={3}
                  value={getArrayAsText(formData.universitySpecialties)}
                  onChange={(e) => handleArrayChange('universitySpecialties', e.target.value)}
                  placeholder={`Engineering
Technology
Applied Sciences
Business Administration`}
                  disabled={submitting}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={submitting}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} className="bg-medicaps-blue hover:bg-medicaps-blue/90">
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {editingProgram ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Program
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
export default EnhancedProgramForm;