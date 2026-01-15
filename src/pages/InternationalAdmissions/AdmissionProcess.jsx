import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, FileText, Mail, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const AdmissionProcess = () => {
  const steps = [
    {
      step: 1,
      title: 'Application Submission',
      description: 'Submit your online application with all required documents',
      icon: FileText,
      details: [
        'Fill out the online application form',
        'Upload academic transcripts',
        'Submit English proficiency test scores (IELTS/TOEFL)',
        'Provide passport copy and photographs',
        'Pay application fee',
      ],
    },
    {
      step: 2,
      title: 'Document Review',
      description: 'Our admissions team reviews your application',
      icon: CheckCircle,
      details: [
        'Verification of academic credentials',
        'Evaluation of eligibility criteria',
        'Review of supporting documents',
        'Assessment of English proficiency',
      ],
    },
    {
      step: 3,
      title: 'Admission Decision',
      description: 'Receive your admission offer letter',
      icon: Award,
      details: [
        'Admission decision within 2-3 weeks',
        'Offer letter sent via email',
        'Scholarship decisions (if applicable)',
        'Acceptance deadline information',
      ],
    },
    {
      step: 4,
      title: 'Visa Application',
      description: 'Apply for student visa with our support',
      icon: FileText,
      details: [
        'Visa application guidance provided',
        'Required documents checklist',
        'FRRO registration assistance',
        'Pre-departure orientation',
      ],
    },
    {
      step: 5,
      title: 'Arrival & Orientation',
      description: 'Welcome to Medicaps University!',
      icon: CheckCircle,
      details: [
        'Airport pickup assistance',
        'Campus orientation program',
        'Hostel accommodation support',
        'Registration and enrollment',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admission Process | International Admissions - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Admission Process</h1>
          <p className="text-xl text-slate-600 mb-12">
            Follow these simple steps to apply for admission at Medicaps University.
          </p>

          <div className="space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.step} className="relative">
                  <Card className="relative z-10">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#283887] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-bold text-lg">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <Icon className="h-5 w-5 text-[#283887]" />
                            {step.title}
                          </CardTitle>
                          <p className="text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-16">
                        {step.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start gap-2 text-slate-700">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {!isLast && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-[#283887]/20 z-0" style={{ height: 'calc(100% + 2rem)' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Important Dates */}
          <Card className="mt-12 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Badge className="mb-2">Fall Intake</Badge>
                  <p className="text-sm text-slate-700">Application Deadline: May 31, 2025</p>
                  <p className="text-sm text-slate-700">Semester Start: August 2025</p>
                </div>
                <div>
                  <Badge className="mb-2">Spring Intake</Badge>
                  <p className="text-sm text-slate-700">Application Deadline: November 30, 2025</p>
                  <p className="text-sm text-slate-700">Semester Start: January 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="mt-8 bg-[#283887] text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need Help with Your Application?</h3>
              <p className="text-white/90 mb-4">Our admissions team is here to assist you.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Contact Admissions Office
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdmissionProcess;
