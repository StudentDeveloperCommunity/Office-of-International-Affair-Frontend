import axios from 'axios';
import { toast } from 'sonner';

// Use environment variable or relative URL in development
const isDevelopment = process.env.NODE_ENV === 'development';
const BACKEND_URL = process.env.REACT_APP_API_URL || (isDevelopment ? '' : 'http://localhost:8000');
const API = `${BACKEND_URL}${BACKEND_URL ? '/api' : '/api'}`;

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

// Debug: Log the actual API URL being used
console.log('🔗 API Base URL:', `${process.env.REACT_APP_API_URL}/api`);
console.log('🔗 Environment REACT_APP_API_URL:', process.env.REACT_APP_API_URL);


// Add a request interceptor to handle different content types
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData, let the browser set it with the correct boundary
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      // Remove Content-Type header to allow the browser to set it with the correct boundary
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    // Attach admin token if present
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug log
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Normalize responses for callers expecting .data
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    console.error('❌ API Response Error:', data || error.message);

    // Friendly toast messages for common error statuses
    if (status === 422) {
      // Handle validation errors (array of error objects)
      const details = Array.isArray(data?.detail) 
        ? data.detail.map(d => d.msg || 'Validation error').join('\n')
        : (data?.detail || 'Validation failed for the submitted data');
      toast.error(details);
    } else if (status >= 400 && status < 500) {
      // Handle client errors
      let errorMessage = 'Request failed. Please check your input.';
      if (data?.detail) {
        errorMessage = Array.isArray(data.detail) 
          ? data.detail.map(d => d.msg || String(d)).join('\n')
          : String(data.detail);
      } else if (data?.message) {
        errorMessage = String(data.message);
      }
      toast.error(errorMessage);
    } else if (status >= 500) {
      // Handle server errors
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Public API functions
export const publicAPI = {
  // Get all active programs
  getPrograms: async (params = {}) => {
    try {
      const response = await apiClient.get('/programs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw new Error('Failed to fetch programs');
    }
  },

  // Get website statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch statistics');
    }
  },

  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to submit contact form';
      throw new Error(errorMessage);
    }
  },

  // Get extended statistics (v2.0)
  getExtendedStats: async () => {
    try {
      const response = await apiClient.get('/stats/extended');
      return response.data;
    } catch (error) {
      console.error('Error fetching extended stats:', error);
      throw new Error('Failed to fetch extended statistics');
    }
  },

  // Get program by ID
  getProgramById: async (id) => {
    try {
      const response = await apiClient.get(`/programs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching program:', error);
      throw new Error('Failed to fetch program');
    }
  },

  // ==================== NEWS (v2.0) ====================
  getNews: async (params = {}) => {
    try {
      const response = await apiClient.get('/news', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  },

  getNewsById: async (id) => {
    try {
      const response = await apiClient.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news article:', error);
      throw new Error('Failed to fetch news article');
    }
  },

  // ==================== PARTNERSHIPS (v2.0) ====================
  getPartnerships: async (params = {}) => {
    try {
      const response = await apiClient.get('/partnerships', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching partnerships:', error);
      throw new Error('Failed to fetch partnerships');
    }
  },

  getPartnershipById: async (id) => {
    try {
      const response = await apiClient.get(`/partnerships/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching partnership:', error);
      throw new Error('Failed to fetch partnership');
    }
  },

  // ==================== TEAM (v2.0) ====================
  getTeam: async () => {
    try {
      const response = await apiClient.get('/team');
      return response.data;
    } catch (error) {
      console.error('Error fetching team:', error);
      throw new Error('Failed to fetch team members');
    }
  },

  getTeamMemberById: async (id) => {
    try {
      const response = await apiClient.get(`/team/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team member:', error);
      throw new Error('Failed to fetch team member');
    }
  },

  // ==================== EVENTS (v2.0) ====================
  getEvents: async (params = {}) => {
    try {
      const response = await apiClient.get('/events', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  getEventById: async (id) => {
    try {
      const response = await apiClient.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw new Error('Failed to fetch event');
    }
  },

  // ==================== GALLERY (v2.0) ====================
  getGallery: async (params = {}) => {
    try {
      const response = await apiClient.get('/gallery', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      throw new Error('Failed to fetch gallery images');
    }
  },

  getGalleryImageById: async (id) => {
    try {
      const response = await apiClient.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery image:', error);
      throw new Error('Failed to fetch gallery image');
    }
  },

  // ==================== FAQs (v2.0) ====================
  getFAQs: async (category = null) => {
    try {
      const params = category ? { category } : {};
      const response = await apiClient.get('/faqs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw new Error('Failed to fetch FAQs');
    }
  },

  // ==================== STATIC CONTENT (v2.0) ====================
  getStaticContent: async (section = null) => {
    try {
      const params = section ? { section } : {};
      const response = await apiClient.get('/static-content', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching static content:', error);
      throw new Error('Failed to fetch static content');
    }
  },

  getStaticContentByKey: async (key) => {
    try {
      const response = await apiClient.get(`/static-content/${key}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching static content:', error);
      throw new Error('Failed to fetch static content');
    }
  },

  // ==================== SEARCH (v2.0) ====================
  globalSearch: async (query, sections = null) => {
    try {
      const params = { q: query };
      if (sections) {
        params.sections = Array.isArray(sections) ? sections.join(',') : sections;
      }
      const response = await apiClient.get('/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error performing search:', error);
      throw new Error('Failed to perform search');
    }
  },

  // ==================== FORMS (v2.0) ====================
  submitTypedForm: async (formType, formData) => {
    try {
      const response = await apiClient.post(`/forms/${formType}`, formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.status === 422) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          const errorMessages = detail.map((err) => {
            const loc = Array.isArray(err?.loc) ? err.loc : [];
            const field = loc.length ? String(loc[loc.length - 1]) : 'field';
            const msg = err?.msg ? String(err.msg) : 'Validation error';
            return `${field}: ${msg}`;
          });
          throw new Error(errorMessages.join('\n'));
        }
        if (typeof detail === 'string' && detail.trim()) {
          throw new Error(detail);
        }
        throw new Error('Validation failed for the submitted data');
      }

      const errorMessage = error.response?.data?.detail || 'Failed to submit form';
      throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Failed to submit form');
    }
  },
};

// Admin API functions
export const adminAPI = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/admin/login', credentials);
      const data = response.data;
      
      // Store JWT token if login successful
      if (data.success && data.access_token) {
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('adminUsername', data.username);
      }
      
      return data;
    } catch (error) {
      console.error('Error during admin login:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  // Admin logout
  logout: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // Set authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await apiClient.post('/admin/logout', null, config);
      }
      
      // Clear stored credentials
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminLoggedIn');
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error during admin logout:', error);
      // Clear credentials even if logout request fails
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminLoggedIn');
      throw new Error('Logout failed');
    }
  },

  // Get authorization headers
  getAuthHeaders: () => {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Get stats config (admin-editable counters)
  getStatsConfig: async () => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.get('/admin/stats-config', { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching stats config:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch stats config');
    }
  },

  // Update stats config (admin-editable counters)
  updateStatsConfig: async (payload) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put('/admin/stats-config', payload, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating stats config:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error(error.response?.data?.detail || 'Failed to update stats config');
    }
  },

  // Get news by ID
  getNewsById: async (newsId) => {
    try {
      const response = await apiClient.get(`/news/${newsId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch news');
    }
  },

  // Get partnership by ID
  getPartnershipById: async (partnershipId) => {
    try {
      const response = await apiClient.get(`/partnerships/${partnershipId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching partnership by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch partnership');
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      const response = await apiClient.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch event');
    }
  },

  // Get team member by ID
  getTeamMemberById: async (memberId) => {
    try {
      const response = await apiClient.get(`/team/${memberId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team member by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch team member');
    }
  },

  // Get gallery image by ID
  getGalleryImageById: async (imageId) => {
    try {
      const response = await apiClient.get(`/gallery/${imageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery image by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch gallery image');
    }
  },

  // Get FAQ by ID
  getFAQById: async (faqId) => {
    try {
      // There is no dedicated /faqs/{id} route in the backend; fetch all and pick.
      const response = await apiClient.get('/faqs');
      const faqs = Array.isArray(response.data) ? response.data : [];
      const faq = faqs.find(f => String(f?.id) === String(faqId));
      if (!faq) {
        throw new Error('FAQ not found');
      }
      return faq;
    } catch (error) {
      console.error('Error fetching FAQ by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error(error.message || 'Failed to fetch FAQ');
    }
  },

  // Get contact (submission) by ID
  getContactById: async (contactId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.get('/admin/contacts', { headers });
      const contacts = Array.isArray(response.data) ? response.data : [];
      const contact = contacts.find(c => String(c?.id) === String(contactId));
      if (!contact) {
        throw new Error('Contact not found');
      }
      return contact;
    } catch (error) {
      console.error('Error fetching contact by id:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error(error.message || 'Failed to fetch contact');
    }
  },

  // Get all programs (including inactive)
  getAllPrograms: async () => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.get('/admin/programs', { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin programs:', error);
      if (error.response?.status === 401) {
        // Clear invalid token
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch programs');
    }
  },

  // Create new program
  createProgram: async (programData) => {
    try {
      console.log('Creating program with data:', JSON.stringify(programData, null, 2));
      const headers = adminAPI.getAuthHeaders();
      
      // Ensure required fields are present
      const requiredFields = ['title', 'partnerUniversity', 'duration', 'deadline'];
      const missingFields = requiredFields.filter(field => !programData[field]);
      
      if (missingFields.length > 0) {
        const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
        console.error('Validation error:', errorMsg);
        throw new Error(errorMsg);
      }
      
      const response = await apiClient.post('/admin/programs', programData, { 
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Program created successfully:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Error creating program:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
      
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Your session has expired. Please log in again.');
      }
      
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to create program. Please check your input and try again.';
      
      throw new Error(errorMessage);
    }
  },

  // Update existing program
  updateProgram: async (programId, programData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/programs/${programId}`, programData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating program:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const detail = error.response.data.detail;
        const messages = Array.isArray(detail)
          ? detail.map((d) => {
              const field = Array.isArray(d.loc) ? d.loc[d.loc.length - 1] : 'field';
              return `${field}: ${d.msg}`;
            })
          : [String(detail)];
        throw new Error(messages.join('; '));
      }
      const errorMessage = error.response?.data?.detail || 'Failed to update program';
      throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Failed to update program');
    }
  },

  // Delete program
  deleteProgram: async (programId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/programs/${programId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting program:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      const errorMessage = error.response?.data?.detail || 'Failed to delete program';
      throw new Error(errorMessage);
    }
  },

  // Get all contact submissions
  getContacts: async () => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.get('/admin/contacts', { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to fetch contacts');
    }
  },

  // Mark contact as read
  markContactAsRead: async (contactId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/contacts/${contactId}/read`, {}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error marking contact as read:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to mark contact as read');
    }
  },

  // Delete contact message
  deleteContact: async (contactId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/contacts/${contactId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete contact');
    }
  },

  // ==================== ADMIN NEWS (v2.0) ====================
  createNews: async (newsData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.post('/admin/news', newsData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating news:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to create news');
    }
  },

  updateNews: async (newsId, newsData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/news/${newsId}`, newsData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating news:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to update news');
    }
  },

  deleteNews: async (newsId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/news/${newsId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting news:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete news');
    }
  },

  // ==================== ADMIN PARTNERSHIPS (v2.0) ====================
  createPartnership: async (partnershipData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.post('/admin/partnerships', partnershipData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating partnership:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      } else if (error.response?.status === 422) {
        // Handle validation errors
        const validationErrors = error.response?.data?.detail || [];
        const errorMessages = validationErrors.map(err => {
          const field = err.loc?.[1] || 'field';
          return `${field}: ${err.msg}`;
        });
        throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
      }
      throw new Error(error.response?.data?.message || 'Failed to create partnership');
    }
  },

  updatePartnership: async (partnershipId, partnershipData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/partnerships/${partnershipId}`, partnershipData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating partnership:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      } else if (error.response?.status === 422) {
        // Handle validation errors
        const validationErrors = error.response?.data?.detail || [];
        const errorMessages = validationErrors.map(err => {
          const field = err.loc?.[1] || 'field';
          return `${field}: ${err.msg}`;
        });
        throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
      }
      throw new Error(error.response?.data?.message || 'Failed to update partnership');
    }
  },

  deletePartnership: async (partnershipId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/partnerships/${partnershipId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting partnership:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete partnership');
    }
  },

  // ==================== ADMIN TEAM (v2.0) ====================
  createTeamMember: async (memberData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const config = {
        headers: {
          ...headers,
          'Accept': 'application/json',
        },
        transformRequest: (data, headers) => {
          // Let the browser set boundary for FormData
          delete headers['Content-Type'];
          return data;
        }
      };

      const response = await apiClient.post('/admin/team', memberData, config);
      return response.data;
    } catch (error) {
      console.error('Error creating team member:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to create team member');
    }
  },

  updateTeamMember: async (memberId, memberData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const config = {
        headers: {
          ...headers,
          'Accept': 'application/json',
        },
        transformRequest: (data, headers) => {
          // Let the browser set boundary for FormData
          delete headers['Content-Type'];
          return data;
        }
      };

      const response = await apiClient.put(`/admin/team/${memberId}`, memberData, config);
      return response.data;
    } catch (error) {
      console.error('Error updating team member:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to update team member');
    }
  },

  deleteTeamMember: async (memberId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/team/${memberId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting team member:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete team member');
    }
  },

  // ==================== ADMIN EVENTS (v2.0) ====================
  createEvent: async (eventData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.post('/admin/events', eventData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to create event');
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/events/${eventId}`, eventData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to update event');
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/events/${eventId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete event');
    }
  },

  // ==================== ADMIN GALLERY (v2.0) ====================
  uploadGalleryImage: async (formData) => {
    try {
      // Create a new FormData instance to ensure clean data
      const data = new FormData();
      
      // Copy all fields from the provided formData
      for (const [key, value] of formData.entries()) {
        if (value !== null && value !== undefined) {
          // Handle file uploads
          if (key === 'file' && value instanceof File) {
            data.append('file', value, value.name);
          } 
          // Handle other fields
          else {
            data.append(key, value);
          }
        }
      }
      
      // Set headers for file upload
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        // Important for file uploads
        transformRequest: (data, headers) => {
          // Let the browser set the content type with the correct boundary
          delete headers['Content-Type'];
          return data;
        }
      };
      
      console.log('Sending form data to server...');
      const response = await apiClient.post('/admin/gallery', data, config);
      return response.data;
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Your session has expired. Please log in again.');
      } 
      
      if (error.response?.data?.detail) {
        // Handle validation errors
        const errorMessages = Array.isArray(error.response.data.detail) 
          ? error.response.data.detail.map(err => {
              const field = err.loc?.[1] || 'field';
              return `${field}: ${err.msg}`;
            })
          : [error.response.data.detail];
          
        throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
      }
      
      throw new Error(error.response?.data?.message || 'Failed to upload gallery image. Please try again.');
    }
  },

  updateGalleryImage: async (imageId, formData) => {
    try {
      // Create a new FormData instance to ensure clean data
      const data = new FormData();

      for (const [key, value] of formData.entries()) {
        if (value !== null && value !== undefined) {
          if (key === 'file' && value instanceof File) {
            data.append('file', value, value.name);
          } else {
            data.append(key, value);
          }
        }
      }

      const headers = adminAPI.getAuthHeaders();
      const config = {
        headers: {
          ...headers,
          'Accept': 'application/json',
        },
        transformRequest: (data, headers) => {
          // Let the browser set boundary
          delete headers['Content-Type'];
          return data;
        }
      };

      const response = await apiClient.put(`/admin/gallery/${imageId}`, data, config);
      return response.data;
    } catch (error) {
      console.error('Error updating gallery image:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error(error.response?.data?.detail || 'Failed to update gallery image');
    }
  },

  deleteGalleryImage: async (imageId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/gallery/${imageId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete gallery image');
    }
  },

  // ==================== ADMIN FAQs (v2.0) ====================
  createFAQ: async (faqData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.post('/admin/faqs', faqData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to create FAQ');
    }
  },

  updateFAQ: async (faqId, faqData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/faqs/${faqId}`, faqData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to update FAQ');
    }
  },

  deleteFAQ: async (faqId) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/faqs/${faqId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete FAQ');
    }
  },

  // ==================== ADMIN STATIC CONTENT (v2.0) ====================
  createStaticContent: async (contentData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.post('/admin/static-content', contentData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating static content:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to create static content');
    }
  },

  updateStaticContent: async (key, contentData) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.put(`/admin/static-content/${key}`, contentData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating static content:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to update static content');
    }
  },

  deleteStaticContent: async (key) => {
    try {
      const headers = adminAPI.getAuthHeaders();
      const response = await apiClient.delete(`/admin/static-content/${key}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting static content:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        throw new Error('Authentication required');
      }
      throw new Error('Failed to delete static content');
    }
  },
};

export default apiClient;