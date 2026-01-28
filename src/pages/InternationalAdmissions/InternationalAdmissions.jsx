import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Award, GraduationCap, FileText, DollarSign, Globe, CheckCircle } from 'lucide-react';
import { useStaticContentByKey } from '../../hooks/useOIAData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const InternationalAdmissions = () => {
  const { data: whyMediCaps } = useStaticContentByKey('why_medicaps');

  const customMarkdownComponents = {
    h1: ({node, ...props}) => (
      <h3 className="text-lg font-bold text-medicaps-blue mt-4 mb-2" {...props} />
    ),
    ul: ({node, ...props}) => (
      <ul className="list-disc list-inside ml-2 space-y-1 text-slate-700" {...props} />
    ),
    li: ({node, ...props}) => (
      <li className="text-slate-700" {...props} />
    ),
  };

  const sections = [
    {
      title: 'Programs Offered',
      description: 'Explore our diverse range of academic programs',
      href: '/international-admissions/programs',
      icon: GraduationCap,
    },
    {
      title: 'Admission Process',
      description: 'Step-by-step guide to applying',
      href: '/international-admissions/process',
      icon: FileText,
    },
    {
      title: 'Fees & Scholarships',
      description: 'Tuition fees and available scholarships',
      href: '/international-admissions/fees',
      icon: DollarSign,
    },
    {
      title: 'Visa & FRRO',
      description: 'Visa requirements and FRRO registration',
      href: '/international-admissions/visa',
      icon: Globe,
    },
  ];

  const highlights = [
    { icon: Award, text: 'NAAC A+ Accredited Institution' },
    { icon: GraduationCap, text: '50+ International Partnerships' },
    { icon: CheckCircle, text: 'World-class Faculty and Research Facilities' },
    { icon: Globe, text: 'Multicultural Campus Environment' },
  ];

  return (
    <>
      <Helmet>
        <title>International Admissions | OIA - Medicaps University</title>
        <meta name="description" content="Apply to Medicaps University as an international student. Explore programs, admission process, fees, scholarships, and visa requirements." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">International Admissions</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Welcome to Medicaps University! Join our diverse community of international students 
              and experience world-class education in India.
            </p>
          </div>

          {/* Why Medicaps Section */}
          <div className="bg-white rounded-2xl shadow-md p-10 mb-14">
            <h2 className="text-3xl font-bold text-[#283887] mb-6">Why Choose Medicaps University?</h2>
            <div className="h-1 w-16 bg-[#283887] rounded-full mb-6" />
            {whyMediCaps ? (
              <div className="leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
                  {whyMediCaps.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {highlights.map((highlight, idx) => {
                  const Icon = highlight.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                      <Icon className="h-6 w-6 text-[#283887] mt-1 shrink-0" />
                      <p className="text-slate-700">{highlight.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.href} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-[#283887] mb-4" />
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="outline" className="w-full">
                      <Link to={section.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Application CTA */}
          <div className="bg-gradient-to-r from-[#283887] to-[#A21D2E] rounded-2xl p-12 text-white text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-white/90 mb-6 text-lg">
              Start your journey at Medicaps University today. Our admissions team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="bg-white text-[#283887] hover:bg-slate-100">
                <Link to="/international-admissions/process">View Admission Process</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Admissions Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalAdmissions;
