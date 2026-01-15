import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Handshake } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const IndustryPartnerships = () => {
  return (
    <>
      <Helmet>
        <title>Industry & Embassy Partnerships | Global Partnerships - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-[#283887]" />
              <h1 className="text-4xl font-bold text-[#283887]">Industry & Embassy Partnerships</h1>
            </div>
            <p className="text-xl text-slate-600">
              Strategic partnerships with industries and embassies for internships, research, and student opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#283887]" />
                  Industry Partnerships
                </CardTitle>
                <CardDescription>Corporate collaborations for internships and research</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Internship opportunities</li>
                  <li>• Industry-sponsored research</li>
                  <li>• Guest lectures and workshops</li>
                  <li>• Placement opportunities</li>
                  <li>• Joint certification programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-[#283887]" />
                  Embassy Partnerships
                </CardTitle>
                <CardDescription>Collaborations with diplomatic missions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Cultural exchange programs</li>
                  <li>• Scholarship opportunities</li>
                  <li>• Visa facilitation</li>
                  <li>• Educational fairs and events</li>
                  <li>• Government-sponsored programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryPartnerships;
