import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { useEvents } from '../../hooks/useOIAData';
import EventCard from '../../components/oia/EventCard';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [upcomingOnly, setUpcomingOnly] = useState(searchParams.get('upcoming') === 'true');

  const { data, isLoading, error } = useEvents({
    type: type || undefined,
    page,
    page_size: 12,
    upcoming_only: upcomingOnly,
  });

  const handleTypeChange = (value) => {
    const newType = value === 'all' ? '' : value;
    setType(newType);
    setPage(1);
    setSearchParams({ 
      ...(newType && { type: newType }),
      ...(upcomingOnly && { upcoming: 'true' }),
      page: '1' 
    });
  };

  const handleUpcomingToggle = () => {
    const newUpcomingOnly = !upcomingOnly;
    setUpcomingOnly(newUpcomingOnly);
    setPage(1);
    setSearchParams({
      ...(type && type !== 'all' && { type }),
      ...(newUpcomingOnly && { upcoming: 'true' }),
      page: '1',
    });
  };

  const eventTypes = ['Visit', 'Conference', 'Seminar', 'Webinar', 'Delegation'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Events</h3>
          <p className="text-slate-600">{error.message || 'Failed to load events'}</p>
        </div>
      </div>
    );
  }

  const events = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <Helmet>
        <title>Events | Visits, Delegations & Events - OIA</title>
        <meta name="description" content="Explore upcoming and past events, conferences, webinars, and delegations organized by the Office of International Affairs." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Visits, Delegations & Events</h1>
            <p className="text-xl text-slate-600">
              Stay informed about upcoming events, conferences, webinars, and international delegations.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <Select 
              value={type || undefined} 
              onValueChange={handleTypeChange}
              defaultValue={undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {eventTypes.map((eventType) => (
                  <SelectItem key={eventType} value={eventType}>
                    {eventType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={upcomingOnly ? 'default' : 'outline'}
              onClick={handleUpcomingToggle}
              className="ml-auto"
            >
              {upcomingOnly ? 'Show All' : 'Upcoming Only'}
            </Button>
          </div>

          {/* Events Grid */}
          {events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPage = Math.max(1, page - 1);
                      setPage(newPage);
                      setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
                    }}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPage = Math.min(totalPages, page + 1);
                      setPage(newPage);
                      setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
                    }}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <CalendarIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Events Found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;


