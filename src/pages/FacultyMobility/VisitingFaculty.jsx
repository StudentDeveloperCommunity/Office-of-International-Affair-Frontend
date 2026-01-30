import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const VisitingFaculty = () => {
  const eligibility = [
    'PhD degree in relevant field',
    'Minimum 5 years of teaching/research experience',
    'Active research profile with publications',
    'Recommendation from home institution',
    'Clear objectives for the visit',
  ];

  const benefits = [
    'Access to Medicaps research facilities',
    'Collaboration with local faculty',
    'Stipend and accommodation support',
    'Cultural immersion experience',
    'Networking opportunities',
  ];

  return (
    <>
      <Helmet>
        <title>Visiting Faculty | Faculty Mobility & Research - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Visiting Faculty Program</h1>
          <p className="text-xl text-slate-600 mb-8">
            International faculty members are welcome to visit Medicaps University for teaching, 
            research collaboration, and academic exchange.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#283887]" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#283887] mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#283887]" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#283887] mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Application Process</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    To apply as a visiting faculty member, please submit your application through 
                    the Call for Proposals form or contact the OIA office directly.
                  </p>
                  <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Link to="/faculty-mobility-research/proposals">Submit Application</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VisitingFaculty;
