// Custom React Query hooks for OIA data fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { publicAPI, adminAPI } from '../services/api';
import { toast } from 'sonner';

// ==================== NEWS HOOKS ====================
export const useNews = (params = {}) => {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => publicAPI.getNews(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useNewsById = (id) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => publicAPI.getNewsById(id),
    enabled: !!id,
  });
};

// ==================== PARTNERSHIPS HOOKS ====================
export const usePartnerships = (params = {}) => {
  return useQuery({
    queryKey: ['partnerships', params],
    queryFn: () => publicAPI.getPartnerships(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePartnershipById = (id) => {
  return useQuery({
    queryKey: ['partnerships', id],
    queryFn: () => publicAPI.getPartnershipById(id),
    enabled: !!id,
  });
};

// ==================== TEAM HOOKS ====================
export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: () => publicAPI.getTeam(),
    staleTime: 30 * 1000, // Reduced to 30 seconds for testing
    cacheTime: 60 * 1000, // Cache for 1 minute
  });
};

// ==================== EVENTS HOOKS ====================
export const useEvents = (params = {}) => {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => publicAPI.getEvents(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEventById = (id) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => publicAPI.getEventById(id),
    enabled: !!id,
  });
};

// ==================== GALLERY HOOKS ====================
export const useGallery = (params = {}) => {
  return useQuery({
    queryKey: ['gallery', params],
    queryFn: () => publicAPI.getGallery(params),
    staleTime: 5 * 60 * 1000,
  });
};

// ==================== FAQs HOOKS ====================
export const useFAQs = (category = null) => {
  return useQuery({
    queryKey: ['faqs', category],
    queryFn: () => publicAPI.getFAQs(category),
    staleTime: 10 * 60 * 1000,
  });
};

// ==================== STATIC CONTENT HOOKS ====================
export const useStaticContent = (section = null) => {
  return useQuery({
    queryKey: ['static-content', section],
    queryFn: () => publicAPI.getStaticContent(section),
    staleTime: 10 * 60 * 1000,
  });
};

export const useStaticContentByKey = (key) => {
  return useQuery({
    queryKey: ['static-content', key],
    queryFn: () => publicAPI.getStaticContentByKey(key),
    enabled: !!key,
    staleTime: 10 * 60 * 1000,
  });
};

// ==================== STATS HOOKS ====================
export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => publicAPI.getStats(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useExtendedStats = () => {
  return useQuery({
    queryKey: ['stats', 'extended'],
    queryFn: () => publicAPI.getExtendedStats(),
    staleTime: 5 * 60 * 1000,
  });
};

// ==================== PROGRAMS HOOKS ====================
export const usePrograms = (params = {}) => {
  return useQuery({
    queryKey: ['programs', params],
    queryFn: () => publicAPI.getPrograms(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProgramById = (id) => {
  return useQuery({
    queryKey: ['programs', id],
    queryFn: () => publicAPI.getProgramById(id),
    enabled: !!id,
  });
};

// ==================== SEARCH HOOK ====================
export const useGlobalSearch = (query, sections = null, enabled = false) => {
  return useQuery({
    queryKey: ['search', query, sections],
    queryFn: () => publicAPI.globalSearch(query, sections),
    enabled: enabled && query.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
};

// ==================== ADMIN MUTATIONS ====================
export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminAPI.createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('News article created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create news article');
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => adminAPI.updateNews(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['news', variables.id] });
      toast.success('News article updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update news article');
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminAPI.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('News article deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete news article');
    },
  });
};

// Similar mutations for other content types...
export const useCreatePartnership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminAPI.createPartnership(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerships'] });
      toast.success('Partnership created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create partnership');
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminAPI.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create event');
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminAPI.createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add team member');
    },
  });
};


