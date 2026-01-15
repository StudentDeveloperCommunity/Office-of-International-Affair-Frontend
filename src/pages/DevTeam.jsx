import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Users, Code, Globe, Heart, ExternalLink } from 'lucide-react';

const DevTeam = () => {
  const teamMembers = [
    {
      name: 'Avdhesh Bhadoriya',
      role: 'Team Lead',
      description: 'Led the development of the OIA website with expertise in full-stack development and project management.',
      skills: ['React', 'Node.js', 'MongoDB', 'UI/UX Design'],
      linkedin: 'https://www.linkedin.com/in/avdhesh-bhadoriya/',
      icon: <Code className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-[#283887]" />
            <h1 className="text-3xl font-bold text-slate-900">Developing Team of Website</h1>
          </div>
          <p className="text-slate-600">MII Foundation - Building the future of international education</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Development Team</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The talented individuals behind the Office of International Affairs website, 
            dedicated to creating a seamless experience for students and faculty.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[#283887] to-[#3B82F6] rounded-full flex items-center justify-center text-white">
                  {member.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-slate-900 mb-2">
                  {member.name}
                </CardTitle>
                <Badge className="bg-[#A21D2E] text-white px-4 py-1">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {member.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(member.linkedin, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default DevTeam;
