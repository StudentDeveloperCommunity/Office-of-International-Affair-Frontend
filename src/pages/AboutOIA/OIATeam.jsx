import React from 'react';
import { useTeam } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const OIATeam = () => {
  const { data: team, isLoading, error } = useTeam();

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    const fullUrl = `${baseUrl}/${cleanPath}`;
    
    // Add cache-busting timestamp to prevent showing cached/removed images
    return `${fullUrl}?t=${Date.now()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unable to load team information.</p>
          <p className="text-slate-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>OIA Team | About OIA - Medicaps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">OIA Team</h1>
          <p className="text-xl text-slate-600 mb-12">
            Meet our dedicated team of international affairs professionals committed to supporting your global journey.
          </p>
          {team && Array.isArray(team) && team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <Card key={member.id || member._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage 
                          src={getImageUrl(member.image)} 
                          alt={member.name || 'Team Member'} 
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <AvatarFallback>
                          {(member.name || 'TM').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name || 'Team Member'}</CardTitle>
                        <CardDescription>{member.role || 'Position'}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      {member.bio || 'Team member bio will be available soon.'}
                    </p>
                    <div className="space-y-2 text-sm">
                      {member.email && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${member.email}`} className="hover:text-[#283887]">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4" />
                          {member.phone}
                        </div>
                      )}
                      {member.office && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4" />
                          {member.office}
                        </div>
                      )}
                      {member.department && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-4 h-4 bg-[#283887] rounded-full"></div>
                          {member.department}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-slate-600">Team information will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OIATeam;


