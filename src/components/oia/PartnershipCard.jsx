import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const PartnershipCard = ({ partnership }) => {
  const typeColors = {
    'Strategic': 'bg-blue-100 text-blue-800',
    'Research': 'bg-green-100 text-green-800',
    'Dual Degree': 'bg-purple-100 text-purple-800',
    'Student Exchange': 'bg-yellow-100 text-yellow-800',
  };

  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Under Negotiation': 'bg-yellow-100 text-yellow-800',
    'Expired': 'bg-red-100 text-red-800',
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {partnership.logo && (
        <div className="p-4 border-b">
          <img
            src={partnership.logo}
            alt={partnership.partnerName}
            className="h-16 w-auto mx-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge className={typeColors[partnership.type] || 'bg-slate-100 text-slate-800'}>
            {partnership.type}
          </Badge>
          <Badge className={statusColors[partnership.status] || 'bg-slate-100 text-slate-800'}>
            {partnership.status}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{partnership.partnerName}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs mt-2">
          <MapPin className="h-3 w-3" />
          {partnership.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
          {partnership.details}
        </p>
        <div className="flex items-center gap-2">
          <Link
            to={`/global-partnerships/${partnership.id}`}
            className="inline-flex items-center gap-2 text-[#283887] hover:text-[#A21D2E] font-medium text-sm transition-colors"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
          {partnership.website && (
            <a
              href={partnership.website}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-slate-500 hover:text-[#283887] transition-colors"
              aria-label="Visit partner website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnershipCard;


