import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Plane, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const FacultyAbroad = () => {
  const opportunities = [
    {
      title: 'Visiting Professor Program',
      location: 'Multiple Countries',
      duration: '1-2 Semesters',
      type: 'Teaching',
    },
    {
      title: 'Research Fellowship',
      location: 'USA, UK, Europe',
      duration: '3-12 Months',
      type: 'Research',
    },
    {
      title: 'Sabbatical Leave Support',
      location: 'Global',
      duration: '6-12 Months',
      type: 'Research',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Faculty Abroad Opportunities | Faculty Mobility & Research - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Faculty Abroad Opportunities</h1>
          <p className="text-xl text-slate-600 mb-12">
            Explore opportunities for Medi-Caps faculty to teach and conduct research at international institutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {opportunities.map((opp, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="mb-2 w-fit">{opp.type}</Badge>
                  <CardTitle className="text-lg">{opp.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    {opp.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Plane className="h-6 w-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Interested in Going Abroad?</h3>
                  <p className="text-white/90 mb-4">
                    Contact the OIA office to learn about available opportunities and application procedures.
                  </p>
                  <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                    Contact OIA
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FacultyAbroad;
