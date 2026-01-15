import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI, publicAPI } from '../services/api';
import EnhancedProgramForm from '../components/EnhancedProgramForm';

const ProgramFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const initialFormData = {
    // Basic Info
    title: '',
    partnerUniversity: '',
    duration: '',
    deadline: '',
    status: 'Active',
    programType: '',
    degreeLevel: '',
    
    // Enhanced Details
    description: '',
    eligibility: '',
    requirements: '',
    applicationProcess: '',
    applicationLink: '',
    
    // Costs & Support
    tuitionFees: '',
    scholarships: '',
    financialAid: '',
    
    // University Info
    location: '',
    language: '',
    universityWebsite: '',
    contactEmail: '',
    contactPhone: '',
    
    // Additional Fields
    startDate: '',
    endDate: '',
    applicationDeadline: '',
    
    // Arrays (will be joined with newlines)
    highlights: [],
    requirementsList: [],
    benefits: [],
    
    // Default values
    isFeatured: false,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const toBackendProgramPayload = (data) => {
    const limits = {
      title: 200,
      description: 2000,
      partnerUniversity: 200,
      duration: 100,
      eligibility: 500,
      deadline: 100,
      applicationLink: 500,
      purpose: 1000,
      vision: 500,
      tuitionFee: 200,
      livingExpenses: 200,
      insurance: 200,
      visaFees: 200,
      travel: 200,
      universityFounded: 100,
      universityRanking: 200,
      campusInfo: 200,
      studentBody: 200,
    };

    const truncate = (key, value) => {
      if (typeof value !== 'string') return value;
      const max = limits[key];
      const trimmed = value.trim();
      if (!max) return trimmed;
      return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
    };

    const truncateArray = (value, itemMax = 200) => {
      if (!Array.isArray(value)) return value;
      return value
        .filter((v) => v !== null && v !== undefined)
        .map((v) => (typeof v === 'string' ? v.trim().slice(0, itemMax) : v));
    };

    // Map UI fields to backend schema (backend is strict about some types/fields).
    // Only include fields that exist in backend ProgramCreate/ProgramUpdate.
    const payload = {
      title: truncate('title', data.title),
      description: truncate('description', data.description),
      partnerUniversity: truncate('partnerUniversity', data.partnerUniversity),
      duration: truncate('duration', data.duration),
      eligibility: truncate('eligibility', data.eligibility),
      deadline: truncate('deadline', data.deadline),
      applicationLink: truncate('applicationLink', data.applicationLink),
      image: data.image,
      status: data.status,
      purpose: truncate('purpose', data.purpose),
      vision: truncate('vision', data.vision),
      benefits: truncateArray(data.benefits),
      eligibilityDetailed: truncateArray(data.eligibilityDetailed),
      tuitionFee: truncate('tuitionFee', data.tuitionFee ?? data.tuitionFees),
      livingExpenses: truncate('livingExpenses', data.livingExpenses),
      insurance: truncate('insurance', data.insurance),
      visaFees: truncate('visaFees', data.visaFees),
      travel: truncate('travel', data.travel),
      scholarships: truncateArray(data.scholarships),
      accommodation: truncateArray(data.accommodation),
      universityFounded: truncate('universityFounded', data.universityFounded),
      universityRanking: truncate('universityRanking', data.universityRanking),
      universitySpecialties: truncateArray(data.universitySpecialties),
      campusInfo: truncate('campusInfo', data.campusInfo),
      studentBody: truncate('studentBody', data.studentBody),
    };

    // Remove undefined / empty-string optional fields to avoid backend validation edge cases.
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (value === undefined) delete payload[key];
      if (typeof value === 'string' && value.trim() === '' && ![
        'title',
        'description',
        'partnerUniversity',
        'duration',
        'eligibility',
        'deadline',
        'applicationLink'
      ].includes(key)) {
        delete payload[key];
      }
    });

    return payload;
  };

  // Load program data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadProgram = async () => {
        try {
          const program = await publicAPI.getProgramById(id);
          // Ensure all fields have values, fallback to empty strings
          const sanitizedProgram = { ...initialFormData, ...program };
          setFormData(sanitizedProgram);
        } catch (error) {
          console.error('Error loading program:', error);
          toast.error(error.response?.data?.message || 'Failed to load program data');
          navigate('/admin/dashboard');
        }
      };
      loadProgram();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e, sanitizedData) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Prepare the data to send
      const dataToSend = { ...(sanitizedData || formData) };
      
      // Ensure required fields are present
      if (!dataToSend.status) dataToSend.status = 'Active';
      if (!dataToSend.isActive) dataToSend.isActive = true;
      
      // Ensure applicationLink is a valid URL
      if (dataToSend.applicationLink && !dataToSend.applicationLink.match(/^https?:\/\//)) {
        dataToSend.applicationLink = `https://${dataToSend.applicationLink}`;
      }
      
      // Convert string arrays to arrays for list fields
      const listFields = [
        'highlights', 
        'requirementsList', 
        'benefits',
        'eligibilityDetailed',
        'scholarships',
        'accommodation',
        'universitySpecialties'
      ];
      
      listFields.forEach(field => {
        if (dataToSend[field]) {
          if (typeof dataToSend[field] === 'string') {
            dataToSend[field] = dataToSend[field]
              .split('\n')
              .filter(item => item.trim() !== '');
          } else if (!Array.isArray(dataToSend[field])) {
            dataToSend[field] = [];
          }
        } else {
          dataToSend[field] = [];
        }
      });
      
      // Log the data being sent for debugging
      const backendPayload = toBackendProgramPayload(dataToSend);
      console.log('Submitting program data:', backendPayload);
      
      if (isEditMode) {
        const updatedProgram = await adminAPI.updateProgram(id, backendPayload);
        console.log('Updated program response:', updatedProgram);
        toast.success('Program updated successfully');
      } else {
        const newProgram = await adminAPI.createProgram(backendPayload);
        console.log('Created program response:', newProgram);
        toast.success('Program created successfully');
      }
      
      // Give a small delay before navigating to show the success message
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving program:', error);
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to save program';
      toast.error(errorMessage);
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Program' : 'Add New Program'}
      </h1>
      
      <EnhancedProgramForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
        editingProgram={isEditMode}
      />
    </div>
  );
};

export default ProgramFormPage;
