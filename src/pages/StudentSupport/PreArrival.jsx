import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Plane, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const PreArrival = () => {
  const checklist = [
    { category: 'Documents', items: ['Valid passport', 'Student visa', 'Admission letter', 'Academic transcripts', 'Medical certificates', 'Insurance documents'] },
    { category: 'Travel', items: ['Flight tickets', 'Travel insurance', 'Airport pickup confirmation', 'Emergency contact numbers'] },
    { category: 'Accommodation', items: ['Hostel booking confirmation', 'Accommodation address', 'Contact person details'] },
    { category: 'Financial', items: ['Sufficient funds', 'Bank account details', 'Currency exchange', 'Payment receipts'] },
    { category: 'Academic', items: ['Course registration details', 'Class schedule', 'Textbook list', 'Laptop/device'] },
  ];

  return (
    <>
      <Helmet>
        <title>Pre-arrival Guide | International Student Support - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Pre-arrival Checklist</h1>
          <p className="text-xl text-slate-600 mb-12">
            Essential checklist to ensure a smooth arrival and transition to Medicaps University.
          </p>

          <div className="space-y-6">
            {checklist.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.category === 'Travel' && <Plane className="h-5 w-5 text-[#283887]" />}
                    {section.category === 'Documents' && <FileText className="h-5 w-5 text-[#283887]" />}
                    {section.category !== 'Travel' && section.category !== 'Documents' && <CheckCircle className="h-5 w-5 text-[#283887]" />}
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Airport Pickup Service</h3>
              <p className="text-blue-800 text-sm mb-4">
                We provide airport pickup service for international students. Please inform us of your 
                flight details at least 3 days before arrival.
              </p>
              <a href="/contact" className="text-blue-700 hover:text-blue-900 font-medium text-sm">
                Request Airport Pickup →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PreArrival;
