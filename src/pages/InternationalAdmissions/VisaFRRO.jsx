import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const VisaFRRO = () => {
  const steps = [
    {
      step: 1,
      title: 'Apply for Student Visa',
      description: 'Submit visa application at Indian embassy/consulate in your country',
      timeline: '4-6 weeks',
      documents: ['Admission letter', 'Passport', 'Financial proof', 'Medical certificate'],
    },
    {
      step: 2,
      title: 'Visa Approval',
      description: 'Receive Student Visa (S-Visa)',
      timeline: '4-6 weeks',
      documents: [],
    },
    {
      step: 3,
      title: 'Travel to India',
      description: 'Arrive in India with valid visa',
      timeline: 'As per program start',
      documents: [],
    },
    {
      step: 4,
      title: 'FRRO Registration',
      description: 'Register with Foreigners Regional Registration Office within 14 days',
      timeline: 'Within 14 days',
      documents: ['Visa', 'Passport', 'Admission letter', 'Address proof'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Visa & FRRO | International Admissions - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Visa & FRRO Registration</h1>
          <p className="text-xl text-slate-600 mb-12">
            Complete guide to obtaining your student visa and completing FRRO registration.
          </p>

          <div className="space-y-6 mb-8">
            {steps.map((step, idx) => (
              <Card key={idx} className="relative">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#283887] text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        {step.title}
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.timeline}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {step.documents.length > 0 && (
                  <CardContent className="ml-14">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Required Documents:</p>
                    <ul className="space-y-1">
                      {step.documents.map((doc, docIdx) => (
                        <li key={docIdx} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Apply for visa at least 6 weeks before program start date</li>
                <li>• FRRO registration is mandatory for all international students</li>
                <li>• OIA provides complete support for visa and FRRO processes</li>
                <li>• Keep all documents ready and make copies</li>
                <li>• Contact OIA immediately upon arrival for FRRO registration assistance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VisaFRRO;
