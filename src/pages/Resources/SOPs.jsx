import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const SOPs = () => {
  const sops = [
    {
      title: 'Student Exchange Program SOP',
      category: 'Student Mobility',
      sections: [
        {
          heading: 'Application Process',
          content: 'Students must submit applications through the online portal at least 3 months before the program start date. Required documents include transcripts, recommendation letters, and statement of purpose.',
        },
        {
          heading: 'Selection Criteria',
          content: 'Selection is based on academic performance (minimum CGPA 7.5), English proficiency, and interview performance. Priority is given to students with relevant coursework and research experience.',
        },
        {
          heading: 'Credit Transfer',
          content: 'Credits earned abroad are transferred on a 1:1 basis with ECTS system. Students must complete minimum 12 credits per semester. All courses must be pre-approved by the academic department.',
        },
      ],
    },
    {
      title: 'Faculty Exchange Program SOP',
      category: 'Faculty Mobility',
      sections: [
        {
          heading: 'Eligibility',
          content: 'Full-time faculty members with minimum 3 years of service are eligible. Applicants must have a strong research profile and clear objectives for the exchange.',
        },
        {
          heading: 'Application Requirements',
          content: 'Submit research proposal, CV, letter of support from department head, and proposed collaboration plan. Applications are reviewed quarterly.',
        },
        {
          heading: 'Funding',
          content: 'Funding is available through various grants. Faculty may receive travel allowance, accommodation support, and research funding based on proposal quality.',
        },
      ],
    },
    {
      title: 'International Admissions SOP',
      category: 'Admissions',
      sections: [
        {
          heading: 'Application Submission',
          content: 'International students must submit applications through the online portal with all required documents including transcripts, English proficiency scores, and passport copy.',
        },
        {
          heading: 'Document Verification',
          content: 'All documents must be verified by recognized authorities. Transcripts must be translated to English if in another language. Equivalency certificates may be required.',
        },
        {
          heading: 'Visa Process',
          content: 'Admitted students receive admission letter and visa support documents. Students must apply for Student Visa (S-Visa) at Indian embassy/consulate in their country. FRRO registration is required within 14 days of arrival.',
        },
      ],
    },
    {
      title: 'Partnership Establishment SOP',
      category: 'Partnerships',
      sections: [
        {
          heading: 'Initial Contact',
          content: 'Partnership proposals can be submitted through the online form or via email. Initial discussions are held to assess mutual interests and compatibility.',
        },
        {
          heading: 'MoU Development',
          content: 'Draft MoU is prepared outlining collaboration areas, responsibilities, and terms. Legal review is conducted before finalization.',
        },
        {
          heading: 'Signing and Implementation',
          content: 'MoU is signed by authorized representatives from both institutions. Implementation plan is developed and regular reviews are conducted.',
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>OIA SOPs | Resources & Systems - OIA</title>
        <meta name="description" content="Standard Operating Procedures for student mobility, faculty exchange, admissions, and partnerships." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Standard Operating Procedures (SOPs)</h1>
            <p className="text-xl text-slate-600">
              Comprehensive guidelines and procedures for all OIA operations and services.
            </p>
          </div>

          <div className="space-y-6">
            {sops.map((sop, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#283887]" />
                        {sop.title}
                      </CardTitle>
                      <CardDescription className="mt-1">{sop.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {sop.sections.map((section, sectionIdx) => (
                      <AccordionItem key={sectionIdx} value={`${idx}-${sectionIdx}`}>
                        <AccordionTrigger className="text-left">
                          {section.heading}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-slate-600">{section.content}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-slate-100">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600">
                <strong>Note:</strong> These SOPs are subject to periodic review and updates. 
                For the most current version or clarifications, please contact the OIA office.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SOPs;
