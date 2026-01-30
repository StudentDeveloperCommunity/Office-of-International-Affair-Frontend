import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  const typeColors = {
    'Visit': 'bg-blue-100 text-blue-800',
    'Conference': 'bg-green-100 text-green-800',
    'Seminar': 'bg-yellow-100 text-yellow-800',
    'Webinar': 'bg-purple-100 text-purple-800',
    'Delegation': 'bg-red-100 text-red-800',
  };

  const isUpcoming = new Date(event.startDate) > new Date();

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x200/283887/ffffff?text=Event';
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${imagePath}`;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {event.images && event.images.length > 0 && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={getImageUrl(event.images[0])}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200/283887/ffffff?text=Event';
            }}
          />
          {event.featured && (
            <Badge className="absolute top-2 right-2 bg-[#A21D2E] text-white">Featured</Badge>
          )}
          {isUpcoming && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">Upcoming</Badge>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={typeColors[event.type] || 'bg-slate-100 text-slate-800'}>
            {event.type}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="space-y-1 text-xs mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(event.startDate), 'MMM dd, yyyy')}
            {event.endDate && ` - ${format(new Date(event.endDate), 'MMM dd, yyyy')}`}
          </div>
          {event.venue && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.venue}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
          {event.description}
        </p>
        <Link
          to={`/visits-delegations-events/${event.id}`}
          className="inline-flex items-center gap-2 text-medicaps-blue hover:text-medicaps-red font-medium text-sm transition-colors" onClick={() => sessionStorage.setItem(`title-${event.id}`, event.title)}
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;


