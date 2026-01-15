import React from 'react';
import { useTeam } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const ContactDirectory = () => {
  const { data: team, isLoading } = useTeam();

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

  const contactInfo = {
    office: "Office of International Affairs",
    address: "A.B. Road Pigdamber, Rau, Indore, Madhya Pradesh 453331",
    phone: "+91 731 3111500",
    email: "international@medicaps.ac.in",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Directory | Resources & Systems - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Contact Directory</h1>
          <p className="text-xl text-slate-600 mb-12">
            Get in touch with our OIA team members for assistance.
          </p>

          {/* Office Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Office Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#283887] mt-0.5" />
                <div>
                  <p className="font-semibold">{contactInfo.office}</p>
                  <p className="text-slate-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#283887]" />
                <a href={`tel:${contactInfo.phone}`} className="text-slate-600 hover:text-[#283887]">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#283887]" />
                <a href={`mailto:${contactInfo.email}`} className="text-slate-600 hover:text-[#283887]">
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-600">Office Hours: {contactInfo.hours}</p>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          {team && team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={getImageUrl(member.image)} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <a href={`mailto:${member.email}`} className="text-slate-600 hover:text-[#283887]">
                          {member.email}
                        </a>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <a href={`tel:${member.phone}`} className="text-slate-600 hover:text-[#283887]">
                          {member.phone}
                        </a>
                      </div>
                    )}
                    {member.office && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">{member.office}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-600">Team information will be available soon.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactDirectory;
