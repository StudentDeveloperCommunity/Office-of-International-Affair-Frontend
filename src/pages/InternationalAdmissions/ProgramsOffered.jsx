import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const ProgramsOffered = () => {
  const programs = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      programs: [
        'Computer Science & Engineering',
        'Electronics & Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Information Technology',
      ],
    },
    {
      degree: 'Master of Technology (M.Tech)',
      programs: [
        'Computer Science & Engineering',
        'Electronics & Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
      ],
    },
    {
      degree: 'Bachelor of Business Administration (BBA)',
      programs: [
        'General Management',
        'International Business',
        'Finance',
        'Marketing',
      ],
    },
    {
      degree: 'Master of Business Administration (MBA)',
      programs: [
        'General Management',
        'International Business',
        'Finance',
        'Marketing',
        'Human Resource Management',
      ],
    },
    {
      degree: 'Bachelor of Pharmacy (B.Pharm)',
      programs: ['Pharmacy'],
    },
    {
      degree: 'Master of Pharmacy (M.Pharm)',
      programs: [
        'Pharmaceutics',
        'Pharmacology',
        'Pharmaceutical Chemistry',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Programs Offered | International Admissions - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Programs Offered</h1>
          <p className="text-xl text-slate-600 mb-12">
            Explore our diverse range of undergraduate and postgraduate programs designed for international students.
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {programs.map((degree, idx) => (
              <AccordionItem key={idx} value={`degree-${idx}`} className="bg-white rounded-lg shadow-sm px-6 border-slate-200">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-[#283887]" />
                    <span className="font-semibold text-slate-900">{degree.degree}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 ml-8">
                    {degree.programs.map((program, pIdx) => (
                      <li key={pIdx} className="text-slate-600">
                        • {program}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Program Details</h3>
              <p className="text-blue-800 text-sm">
                For detailed information about specific programs, admission requirements, and curriculum, 
                please contact the admissions office or visit the university website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProgramsOffered;
