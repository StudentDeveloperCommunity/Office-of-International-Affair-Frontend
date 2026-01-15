import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Calendar, ExternalLink, Users, Loader2, RefreshCw, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { publicAPI } from '../services/api';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await publicAPI.getPrograms({ page: 1, page_size: 100 });
      const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
      setPrograms(items);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError('Failed to load programs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.partnerUniversity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by archived status
    const isArchived = program.status === 'Archived' || program.status === 'Discontinued' || program.is_archived;
    if (!showArchived && isArchived) return false;
    if (showArchived && !isArchived) return false;
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'engineering') return matchesSearch && program.title.toLowerCase().includes('engineering');
    if (selectedFilter === 'business') return matchesSearch && program.title.toLowerCase().includes('business');
    if (selectedFilter === 'medical') return matchesSearch && program.title.toLowerCase().includes('medical');
    if (selectedFilter === 'computer') return matchesSearch && program.title.toLowerCase().includes('computer');
    if (selectedFilter === 'agriculture') return matchesSearch && program.title.toLowerCase().includes('agriculture');
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading exchange programs...</p>
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
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load Programs</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button onClick={fetchPrograms} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Student Exchange Programs
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover amazing opportunities to study abroad at world-renowned universities 
            and gain international experience that will transform your academic journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search programs or universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300 focus:border-blue-500"
              />
            </div>
            <div className="md:w-64">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="computer">Computer Science</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Archived Programs Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              Showing {filteredPrograms.length} of {programs.length} programs
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  {showArchived ? 'Showing Archived Programs' : 'Show Archived Programs'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Programs List - Attractive Card Design */}
        {filteredPrograms.length > 0 ? (
          <div className="space-y-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden bg-white">
                <div className="border-l-4 border-medicaps-blue">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${program.status === 'Archived' || program.status === 'Discontinued' ? 'bg-slate-500' : 'bg-medicaps-blue'} text-white`}>
                            {program.status}
                          </Badge>
                          {program.status !== 'Archived' && program.status !== 'Discontinued' && (
                            <Badge variant="outline" className="text-medicaps-red border-medicaps-red">
                              Deadline: {program.deadline}
                            </Badge>
                          )}
                          {(program.status === 'Archived' || program.status === 'Discontinued') && (
                            <Badge variant="outline" className="text-slate-500 border-slate-500">
                              No longer available
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl font-metropolis group-hover:text-medicaps-blue transition-colors mb-2">
                          {program.title}
                        </CardTitle>
                        <div className="flex items-center text-slate-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-medicaps-blue" />
                          {program.partnerUniversity}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2">
                      {program.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="bg-medicaps-blue text-white p-2 rounded-full">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 font-medium">Duration</div>
                          <div className="font-semibold text-slate-900">{program.duration}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="bg-medicaps-red text-white p-2 rounded-full">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 font-medium">Eligibility</div>
                          <div className="font-semibold text-slate-900 text-sm">{program.eligibility}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="bg-red-600 text-white p-2 rounded-full">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 font-medium">Application Deadline</div>
                          <div className="font-semibold text-red-600">{program.deadline}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        to={`/program/${program.id}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="lg" className="w-full border-medicaps-blue text-medicaps-blue hover:bg-blue-400 hover:text-white">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      {program.status !== 'Archived' && program.status !== 'Discontinued' && (
                        <Button 
                          size="lg" 
                          className="flex-1 bg-medicaps-red hover:bg-medicaps-red/90 text-white"
                          onClick={() => window.open(program.applicationLink, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      )}
                      {(program.status === 'Archived' || program.status === 'Discontinued') && (
                        <Button 
                          size="lg" 
                          className="flex-1 bg-slate-500 hover:bg-slate-600 text-white"
                          disabled
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Program Ended
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {showArchived ? 'No Archived Programs' : 'No Programs Available'}
            </h3>
            <p className="text-slate-600">
              {showArchived 
                ? 'There are currently no archived programs to display.'
                : 'No programs found matching your criteria. Try adjusting your filters or search terms.'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;