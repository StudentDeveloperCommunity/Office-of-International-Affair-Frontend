import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, ExternalLink, Loader2, RefreshCw, Mail, Newspaper, Handshake, Calendar, Users, HelpCircle, Image, FileText, Settings, Power, PowerOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import EnhancedProgramForm from '../components/EnhancedProgramForm';
import { adminAPI, publicAPI } from '../services/api';
import { useExtendedStats } from '../hooks/useOIAData';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [programs, setPrograms] = useState([]);
  const [news, setNews] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statsConfig, setStatsConfig] = useState({ studentsExchanged: '' });
  const [statsConfigLoading, setStatsConfigLoading] = useState(false);
  const [statsConfigSaving, setStatsConfigSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x300/283887/ffffff?text=Image';
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    return `${baseUrl}/${cleanPath}`;
  };
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const navigate = useNavigate();
  const { data: stats } = useExtendedStats();

  // Enhanced safeRender function with better error handling and debugging
  const safeRender = (value, path = '') => {
    // Helper to check if a value is an error object
    const isErrorObject = (obj) => {
      return obj && typeof obj === 'object' && 
             (obj.type || obj.msg || obj.loc || obj.message || obj.stack);
    };

    try {
      // Handle null/undefined/empty
      if (value === null || value === undefined || value === '') return '—';
      
      // Handle primitive types
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
      }
      
      // Handle Date objects
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      
      // Handle React elements
      if (React.isValidElement(value)) {
        return value;
      }
      
      // Handle arrays
      if (Array.isArray(value)) {
        return value.map((item, i) => safeRender(item, `${path}[${i}]`));
      }
      
      // Handle objects
      if (typeof value === 'object') {
        // Check for error objects first
        if (isErrorObject(value)) {
          console.warn('Error object detected at path:', path, value);
          return '[Error]';
        }
        
        // Handle nested objects
        try {
          const simpleObj = {};
          for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              const currentPath = path ? `${path}.${key}` : key;
              const val = value[key];
              
              // Skip rendering error objects in nested structures
              if (isErrorObject(val)) {
                console.warn('Nested error object detected at path:', currentPath, val);
                simpleObj[key] = '[Error]';
                continue;
              }
              
              simpleObj[key] = safeRender(val, currentPath);
            }
          }
          return JSON.stringify(simpleObj);
        } catch (e) {
          console.warn('Error processing object at path:', path, value);
          return '[Object]';
        }
      }
      
      // Fallback for any other types
      const result = String(value);
      if (result === '[object Object]') {
        console.warn('Unexpected object rendering at path:', path, value);
        return '[Object]';
      }
      return result;
    } catch (error) {
      console.error('Error in safeRender at path:', path, 'Value:', value, 'Error:', error);
      return '[Error]';
    }
  };

  const safeDate = (dateValue) => {
    try {
      if (!dateValue) return '—';
      
      // Handle case where dateValue is an object
      if (typeof dateValue === 'object') {
        console.warn('Date value is an object, not a date:', dateValue);
        return '—';
      }
      
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
    } catch (error) {
      console.error('Error in safeDate:', error, 'Value:', dateValue);
      return '—';
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const hasToken = localStorage.getItem('adminToken');
    if (!isLoggedIn || !hasToken) {
      navigate('/admin');
      return;
    }
    fetchAllData();
    fetchStatsConfig();
  }, [navigate]);

  const fetchStatsConfig = async () => {
    try {
      setStatsConfigLoading(true);
      const config = await adminAPI.getStatsConfig();
      setStatsConfig({
        studentsExchanged: (config?.studentsExchanged ?? '').toString(),
      });
    } catch (err) {
      // Don't block dashboard load on settings issues
      console.error('Failed to fetch stats config:', err);
    } finally {
      setStatsConfigLoading(false);
    }
  };

  const handleSaveStatsConfig = async () => {
    const parsed = Number(statsConfig.studentsExchanged);
    if (!Number.isFinite(parsed) || parsed < 0) {
      toast.error('Students count must be a valid number (0 or greater)');
      return;
    }

    try {
      setStatsConfigSaving(true);
      await adminAPI.updateStatsConfig({ studentsExchanged: parsed });
      toast.success('Homepage students count updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update students count');
    } finally {
      setStatsConfigSaving(false);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Function to safely fetch data and handle errors
      const safeFetch = async (fetchFn, endpoint = '') => {
        try {
          const res = await fetchFn();
          
          // Process the response data
          let data = res?.data?.items || res?.items || 
                    (Array.isArray(res?.data) ? res.data : 
                    (Array.isArray(res) ? res : null));
          
          // If no valid data, return empty array
          if (!data) return [];
          
          // Process and sanitize the data
          return data.map(item => {
            if (!item || typeof item !== 'object') return item;
            
            const processed = { ...item };
            
            // List of fields that should not be truncated
            const longTextFields = [
              'description', 'content', 'bio', 'answer', 'details',
              'question', 'eligibility', 'requirements', 'benefits', 
              'highlights', 'overview', 'content', 'body', 'text'
            ];
            
            // Skip processing for certain endpoints completely
            const skipEndpoints = ['/faqs', '/team', '/events', '/partnerships', '/news'];
            if (skipEndpoints.some(ep => endpoint.includes(ep))) {
              return processed;
            }
            
            // Only process non-long text fields that are strings
            Object.keys(processed).forEach(key => {
              const value = processed[key];
              
              // Skip if not a string or in the long text fields
              if (typeof value !== 'string' || longTextFields.includes(key)) {
                return;
              }
              
              // Skip IDs, dates, and similar fields
              if (key.endsWith('Id') || key.endsWith('_id') || 
                  key.includes('date') || key.includes('time') ||
                  key.includes('created') || key.includes('updated')) {
                return;
              }
              
              // Truncate only if necessary
              if (value.length > 50) {
                processed[key] = value.substring(0, 50);
              }
            });
            
            return processed;
          });
          
        } catch (err) {
          // For 422 errors, return empty array without logging
          if (err.response?.status === 422) {
            return [];
          }
          
          // For other errors, log but don't show to user
          console.error(`Error fetching ${endpoint}:`, err);
          return [];
        }
      };

      // Fetch all data in parallel, but handle news separately to avoid 422 errors
      const [
        programsData,
        newsData,
        partnershipsData,
        eventsData,
        teamData,
        faqsData,
        galleryData,
        contactsData
      ] = await Promise.all([
        safeFetch(() => adminAPI.getAllPrograms(), 'programs'),
        // Get news with valid page size (max 50 as per backend validation)
        (async () => {
          try {
            const result = await publicAPI.getNews({ page: 1, page_size: 10 });
            return Array.isArray(result?.items) ? result.items : [];
          } catch (error) {
            console.error('Error fetching news:', error);
            return [];
          }
        })(),
        safeFetch(() => publicAPI.getPartnerships({ page: 1, page_size: 100 }), 'partnerships'),
        safeFetch(() => publicAPI.getEvents({ page: 1, page_size: 100 }), 'events'),
        safeFetch(() => publicAPI.getTeam(), 'team'),
        safeFetch(() => publicAPI.getFAQs(), 'faqs'),
        safeFetch(() => publicAPI.getGallery({ page: 1, page_size: 100 }), 'gallery'),
        safeFetch(() => adminAPI.getContacts(), 'contacts')
      ]);

      // Update state with fetched data
      setPrograms(Array.isArray(programsData) ? programsData : []);
      setNews(Array.isArray(newsData) ? newsData : []);
      setPartnerships(Array.isArray(partnershipsData) ? partnershipsData : []);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setTeam(Array.isArray(teamData) ? teamData : []);
      setFaqs(Array.isArray(faqsData) ? faqsData : []);
      setGallery(Array.isArray(galleryData) ? galleryData : []);
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      navigate('/admin');
    }
  };

  const handleToggleProgramStatus = async (programId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const confirmMessage = currentStatus === 'Active' 
      ? 'Are you sure you want to deactivate this program? It will no longer be visible to students.'
      : 'Are you sure you want to activate this program? It will become visible to students.';
    
    if (!window.confirm(confirmMessage)) return;
    
    try {
      await adminAPI.updateProgram(programId, { status: newStatus });
      setPrograms(programs.map(p => 
        p.id === programId ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error('Error toggling program status:', err);
      alert('Failed to update program status. Please try again.');
    }
  };

  const handleTogglePartnershipStatus = async (partnershipId, currentStatus) => {
    let newStatus;
    if (currentStatus === 'Active') {
      newStatus = 'Under Negotiation';
    } else if (currentStatus === 'Under Negotiation') {
      newStatus = 'Expired';
    } else {
      newStatus = 'Active';
    }
    
    const confirmMessage = `Are you sure you want to change partnership status from "${currentStatus}" to "${newStatus}"?`;
    
    if (!window.confirm(confirmMessage)) return;
    
    try {
      await adminAPI.updatePartnership(partnershipId, { status: newStatus });
      setPartnerships(partnerships.map(p => 
        p.id === partnershipId ? { ...p, status: newStatus } : p
      ));
      toast.success(`Partnership status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error toggling partnership status:', err);
      toast.error('Failed to update partnership status. Please try again.');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      switch (type) {
        case 'program':
          await adminAPI.deleteProgram(id);
          setPrograms(programs.filter(p => p.id !== id));
          break;
        case 'news':
          await adminAPI.deleteNews(id);
          setNews(news.filter(n => n.id !== id));
          break;
        case 'partnership':
          await adminAPI.deletePartnership(id);
          setPartnerships(partnerships.filter(p => p.id !== id));
          break;
        case 'event':
          await adminAPI.deleteEvent(id);
          setEvents(events.filter(e => e.id !== id));
          break;
        case 'team':
          await adminAPI.deleteTeamMember(id);
          setTeam(team.filter(t => t.id !== id));
          break;
        case 'faq':
          await adminAPI.deleteFAQ(id);
          setFaqs(faqs.filter(f => f.id !== id));
          break;
        case 'gallery':
          await adminAPI.deleteGalleryImage(id);
          setGallery(gallery.filter(g => g.id !== id));
          break;
      }
      toast.success(`${type} deleted successfully`);
    } catch (err) {
      toast.error(`Failed to delete ${type}: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#283887]">Admin Dashboard</h1>
              <p className="text-slate-600">Manage all OIA website content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{stats?.totalPrograms || programs.length}</div>
              <p className="text-xs text-slate-600">Programs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{stats?.newsArticles || news.length}</div>
              <p className="text-xs text-slate-600">News</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{stats?.activePartnerships || partnerships.length}</div>
              <p className="text-xs text-slate-600">Partnerships</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{stats?.totalEvents || events.length}</div>
              <p className="text-xs text-slate-600">Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{stats?.teamMembers || team.length}</div>
              <p className="text-xs text-slate-600">Team</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{faqs.length}</div>
              <p className="text-xs text-slate-600">FAQs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{gallery.length}</div>
              <p className="text-xs text-slate-600">Gallery</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-[#283887]">{contacts.length}</div>
              <p className="text-xs text-slate-600">Contacts</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Programs</h2>
              <Button onClick={() => navigate('/admin/programs/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.slice(0, 6).map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge className={`${safeRender(program.status) === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                          {safeRender(program.status)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleProgramStatus(program.id, safeRender(program.status))}
                          className={`h-6 w-6 p-0 ${safeRender(program.status) === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                          title={safeRender(program.status) === 'Active' ? 'Deactivate Program' : 'Activate Program'}
                        >
                          {safeRender(program.status) === 'Active' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/programs/edit/${program.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete('program', program.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-sm line-clamp-2">{safeRender(program.title)}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {programs.length > 6 && (
              <Button variant="outline" className="w-full">View All Programs</Button>
            )}
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">News & Media</h2>
              <Button onClick={() => navigate('/admin/news/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add News
              </Button>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[55%]">Title</TableHead>
                  <TableHead className="w-[15%] text-center">Category</TableHead>
                  <TableHead className="w-[15%] text-center">Date</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.slice(0, 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium truncate">{safeRender(item.title)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline">{safeRender(item.category)}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">{safeDate(item.date)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/news/edit/${item.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete('news', item.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Partnerships</h2>
              <Button onClick={() => navigate('/admin/partnerships/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Partnership
              </Button>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[35%]">Partner Name</TableHead>
                  <TableHead className="w-[15%] text-center">Type</TableHead>
                  <TableHead className="w-[20%] text-center">Country</TableHead>
                  <TableHead className="w-[15%] text-center">Status</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerships.slice(0, 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium truncate">{safeRender(item.partnerName)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline">{safeRender(item.type)}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="truncate text-center">{safeRender(item.country)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Badge className={`${safeRender(item.status) === 'Active' ? 'bg-green-500' : safeRender(item.status) === 'Under Negotiation' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {safeRender(item.status)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTogglePartnershipStatus(item.id, safeRender(item.status))}
                          className="h-6 w-6 p-0"
                          title={`Change Status (Current: ${safeRender(item.status)})`}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/partnerships/edit/${item.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete('partnership', item.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Events</h2>
              <Button onClick={() => navigate('/admin/events/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[55%]">Title</TableHead>
                  <TableHead className="w-[15%] text-center">Type</TableHead>
                  <TableHead className="w-[15%] text-center">Date</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice(0, 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium truncate">{safeRender(item.title)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline">{safeRender(item.type)}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">{safeDate(item.startDate)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/events/edit/${item.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete('event', item.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button onClick={() => navigate('/admin/team/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{safeRender(member.name)}</CardTitle>
                    <CardDescription>{safeRender(member.role)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/admin/team/edit/${member.id}`)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete('team', member.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">FAQs</h2>
              <Button onClick={() => navigate('/admin/faqs/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70%]">Question</TableHead>
                  <TableHead className="w-[15%] text-center">Category</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.slice(0, 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium truncate">{safeRender(item.question)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline">{safeRender(item.category)}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/faqs/edit/${item.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete('faq', item.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gallery</h2>
              <Button onClick={() => navigate('/admin/gallery/new')} className="bg-[#283887] hover:bg-[#283887]/90">
                <Plus className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.slice(0, 12).map((item) => (
                <Card key={item.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={getImageUrl(item.image)}
                      alt={safeRender(item.title || item.alt)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/283887/ffffff?text=Image';
                      }}
                    />
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs line-clamp-2">{safeRender(item.title)}</p>
                    <div className="flex gap-1 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => navigate(`/admin/gallery/edit/${item.id}`)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleDelete('gallery', item.id)}>
                        <Trash2 className="h-3 w-3 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
              <Button onClick={() => navigate('/admin/contacts')} variant="outline">
                View All
              </Button>
            </div>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[22%]">Name</TableHead>
                  <TableHead className="w-[22%]">Email</TableHead>
                  <TableHead className="w-[14%] text-center">Type</TableHead>
                  <TableHead className="w-[12%] text-center">Status</TableHead>
                  <TableHead className="w-[15%] text-center">Date</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.slice(0, 10).map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium truncate">{safeRender(contact.firstName)} {safeRender(contact.lastName)}</TableCell>
                    <TableCell className="truncate">{safeRender(contact.email)}</TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline">{safeRender(contact.formType || 'Enquiry')}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="truncate text-center">
                      <div className="flex justify-center">
                        <Badge>{safeRender(contact.status)}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">{safeDate(contact.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button size="sm" variant="ghost" onClick={() => navigate('/admin/contacts')}>
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Website Settings</h2>
              <Button
                variant="outline"
                onClick={fetchStatsConfig}
                disabled={statsConfigLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${statsConfigLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Homepage Stats</CardTitle>
                <CardDescription>
                  Update counters shown on the home page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentsExchanged">Students Count</Label>
                  <Input
                    id="studentsExchanged"
                    type="number"
                    min={0}
                    value={statsConfig.studentsExchanged}
                    onChange={(e) => setStatsConfig({ ...statsConfig, studentsExchanged: e.target.value })}
                    placeholder="e.g. 150"
                    disabled={statsConfigLoading || statsConfigSaving}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveStatsConfig}
                    className="bg-[#283887] hover:bg-[#283887]/90"
                    disabled={statsConfigLoading || statsConfigSaving}
                  >
                    {statsConfigSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;