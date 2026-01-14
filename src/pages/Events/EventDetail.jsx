import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Users, ExternalLink } from 'lucide-react';
import { useEventById } from '../../hooks/useOIAData';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading, error } = useEventById(id);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Event Not Found</h3>
          <p className="text-slate-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/visits-delegations-events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const typeColors = {
    'Visit': 'bg-blue-100 text-blue-800',
    'Conference': 'bg-green-100 text-green-800',
    'Seminar': 'bg-yellow-100 text-yellow-800',
    'Webinar': 'bg-purple-100 text-purple-800',
    'Delegation': 'bg-red-100 text-red-800',
  };

  const isUpcoming = new Date(event.startDate) > new Date();

  return (
    <>
      <Helmet>
        <title>{event.title} | Events - OIA</title>
        <meta name="description" content={event.description.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/visits-delegations-events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          {/* Event */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header Image */}
            {event.images && event.images.length > 0 && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={getImageUrl(event.images[0])}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/283887/ffffff?text=Event';
                  }}
                />
                {isUpcoming && (
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    Upcoming
                  </Badge>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <Badge className={typeColors[event.type] || 'bg-slate-100 text-slate-800'}>
                  {event.type}
                </Badge>
                {event.featured && (
                  <Badge className="bg-[#A21D2E] text-white">Featured</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-[#283887] mb-6">{event.title}</h1>

              {/* Event Details */}
              <div className="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#283887] mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Date & Time</p>
                    <p className="text-slate-600">
                      {format(new Date(event.startDate), 'EEEE, MMMM dd, yyyy')}
                      {event.endDate && ` - ${format(new Date(event.endDate), 'EEEE, MMMM dd, yyyy')}`}
                    </p>
                    {event.startDate && (
                      <p className="text-sm text-slate-500 mt-1">
                        {format(new Date(event.startDate), 'h:mm a')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                      </p>
                    )}
                  </div>
                </div>

                {event.venue && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#283887] mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Venue</p>
                      <p className="text-slate-600">{event.venue}</p>
                    </div>
                  </div>
                )}

                {event.organizer && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#283887] mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Organizer</p>
                      <p className="text-slate-600">{event.organizer}</p>
                    </div>
                  </div>
                )}

                {event.participants && event.participants.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#283887] mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Participants</p>
                      <p className="text-slate-600">{event.participants.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description}
                </ReactMarkdown>
              </div>

              {/* Registration Link */}
              {event.registrationLink && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <Button asChild size="lg" className="bg-[#283887] hover:bg-[#283887]/90">
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Register Now
                    </a>
                  </Button>
                </div>
              )}

              {/* Gallery */}
              {event.images && event.images.length > 1 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Event Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images.slice(1).map((image, idx) => (
                      <img
                        key={idx}
                        src={getImageUrl(image)}
                        alt={`${event.title} - Image ${idx + 2}`}
                        className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => window.open(getImageUrl(image), '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default EventDetail;


