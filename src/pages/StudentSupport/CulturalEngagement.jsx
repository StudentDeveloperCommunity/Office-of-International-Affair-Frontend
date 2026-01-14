import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Calendar, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const CulturalEngagement = () => {
  const activities = [
    { name: 'International Food Festival', frequency: 'Annual', type: 'Cultural' },
    { name: 'Cultural Exchange Programs', frequency: 'Monthly', type: 'Cultural' },
    { name: 'Language Exchange Sessions', frequency: 'Weekly', type: 'Academic' },
    { name: 'Festival Celebrations', frequency: 'Seasonal', type: 'Cultural' },
    { name: 'Sports & Recreation', frequency: 'Ongoing', type: 'Sports' },
  ];

  const clubs = [
    'International Students Club',
    'Cultural Society',
    'Photography Club',
    'Music & Arts Club',
    'Sports Club',
    'Debate Society',
  ];

  return (
    <>
      <Helmet>
        <title>Cultural Engagement | International Student Support - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Cultural Engagement</h1>
          <p className="text-xl text-slate-600 mb-12">
            Immerse yourself in Indian culture while sharing your own. Join our vibrant community 
            of international and local students.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#283887]" />
                  Cultural Activities
                </CardTitle>
                <CardDescription>Regular events and celebrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{activity.name}</p>
                        <p className="text-sm text-slate-600">{activity.frequency}</p>
                      </div>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#283887]" />
                  Student Clubs
                </CardTitle>
                <CardDescription>Join clubs and societies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {clubs.map((club, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg text-center">
                      <p className="text-sm font-medium text-slate-700">{club}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  More clubs available. Visit Student Affairs office for complete list.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
              <p className="text-white/90 mb-4">
                Connect with students from around the world and experience the rich cultural diversity 
                at Medicaps University.
              </p>
              <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Get Involved
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CulturalEngagement;
