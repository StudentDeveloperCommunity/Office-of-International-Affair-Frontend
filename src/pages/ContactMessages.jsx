import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, RefreshCw, Loader2, ArrowLeft, Trash2, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { adminAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewContactDialog, setViewContactDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const hasToken = localStorage.getItem('adminToken');
    if (!isLoggedIn || !hasToken) {
      navigate('/admin');
      return;
    }
    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      if (err.message === 'Authentication required') {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminToken');
        navigate('/admin');
      } else {
        setError('Failed to load contact messages. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setViewContactDialog(true);
  };

  const markAsRead = async (contactId) => {
    setActionLoading(contactId);
    try {
      await adminAPI.markContactAsRead(contactId);
      toast({
        title: "Success",
        description: "Message marked as read",
      });
      fetchContacts(); // Refresh the list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }
    
    setActionLoading(contactId);
    try {
      await adminAPI.deleteContact(contactId);
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
      fetchContacts(); // Refresh the list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getNewContacts = () => contacts.filter(contact => contact.status === 'New' || !contact.status);
  const getReadContacts = () => contacts.filter(contact => contact.status === 'Read');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading contact messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load Messages</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button onClick={fetchContacts} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/admin/dashboard')} 
                variant="outline"
                className="border-slate-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
                <p className="text-slate-600">View messages from students and visitors</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {contacts.length} Total Messages
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Messages Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="new" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>New Messages ({getNewContacts().length})</span>
            </TabsTrigger>
            <TabsTrigger value="read" className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Read ({getReadContacts().length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            {getNewContacts().length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getNewContacts().map((contact) => (
              <Card key={contact.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-slate-900">
                        {contact.firstName} {contact.lastName}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {contact.email}
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {contact.status || 'New'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-900 text-sm mb-1">Subject:</p>
                    <p className="text-slate-600 text-sm line-clamp-2">{contact.subject}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900 text-sm mb-1">Message:</p>
                    <p className="text-slate-600 text-sm line-clamp-3">{contact.message}</p>
                  </div>

                  {contact.phone && (
                    <div>
                      <p className="font-medium text-slate-900 text-sm mb-1">Phone:</p>
                      <p className="text-slate-600 text-sm">{contact.phone}</p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-3">
                      Received: {formatDate(contact.createdAt)}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Dialog open={viewContactDialog && selectedContact?.id === contact.id} 
                              onOpenChange={(open) => {
                                setViewContactDialog(open);
                                if (!open) setSelectedContact(null);
                              }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleViewContact(contact)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        className="flex-1 bg-medicaps-blue hover:bg-medicaps-blue/90"
                        onClick={() => markAsRead(contact.id)}
                        disabled={actionLoading === contact.id}
                      >
                        {actionLoading === contact.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Mark Read
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteContact(contact.id)}
                        disabled={actionLoading === contact.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No New Messages</h3>
                <p className="text-slate-600">
                  New contact form submissions will appear here.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="read">
            {getReadContacts().length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getReadContacts().map((contact) => (
                  <Card key={contact.id} className="border-slate-200 hover:shadow-lg transition-shadow opacity-75">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-slate-900">
                            {contact.firstName} {contact.lastName}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {contact.email}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Read
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium text-slate-900 text-sm mb-1">Subject:</p>
                        <p className="text-slate-600 text-sm line-clamp-2">{contact.subject}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-slate-900 text-sm mb-1">Message:</p>
                        <p className="text-slate-600 text-sm line-clamp-3">{contact.message}</p>
                      </div>

                      {contact.phone && (
                        <div>
                          <p className="font-medium text-slate-900 text-sm mb-1">Phone:</p>
                          <p className="text-slate-600 text-sm">{contact.phone}</p>
                        </div>
                      )}
                      
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-3">
                          Received: {formatDate(contact.createdAt)}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Dialog open={viewContactDialog && selectedContact?.id === contact.id} 
                                  onOpenChange={(open) => {
                                    setViewContactDialog(open);
                                    if (!open) setSelectedContact(null);
                                  }}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleViewContact(contact)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                          
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="flex-1"
                            onClick={() => deleteContact(contact.id)}
                            disabled={actionLoading === contact.id}
                          >
                            {actionLoading === contact.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Read Messages</h3>
                <p className="text-slate-600">
                  Messages marked as read will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Contact Details Modal */}
        {selectedContact && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Message from {selectedContact.firstName} {selectedContact.lastName}
              </DialogTitle>
              <DialogDescription>
                Received on {formatDate(selectedContact.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-slate-900 mb-2">Name:</p>
                  <p className="text-slate-600">{selectedContact.firstName} {selectedContact.lastName}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-2">Email:</p>
                  <p className="text-slate-600 break-all">
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
              </div>

              {selectedContact.phone && (
                <div>
                  <p className="font-medium text-slate-900 mb-2">Phone:</p>
                  <p className="text-slate-600">
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              )}

              <div>
                <p className="font-medium text-slate-900 mb-2">Subject:</p>
                <p className="text-slate-600">{selectedContact.subject}</p>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-2">Message:</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}&body=Hello ${selectedContact.firstName},%0D%0A%0D%0AThank you for your inquiry about our exchange programs.%0D%0A%0D%0ABest regards,%0D%0AOffice of International Affairs%0D%0AMedicaps University`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;