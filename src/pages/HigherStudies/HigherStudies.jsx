import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { GraduationCap, DollarSign, FileText, Calculator, Users } from 'lucide-react';

const HigherStudies = () => {
  const sections = [
    {
      title: 'Study Abroad Guidance',
      description: 'Comprehensive guidance for pursuing higher studies abroad',
      href: '/higher-studies-opportunities',
      icon: GraduationCap,
    },
    {
      title: 'Scholarships',
      description: 'Explore scholarship opportunities for international studies',
      href: '/higher-studies-opportunities/scholarships',
      icon: DollarSign,
    },
    {
      title: 'LOR Support',
      description: 'Request Letters of Recommendation for your applications',
      href: '/higher-studies-opportunities/lor',
      icon: FileText,
    },
    {
      title: 'ECTS Conversion',
      description: 'Convert and understand credit systems',
      href: '/higher-studies-opportunities/ects',
      icon: Calculator,
    },
    {
      title: 'Alumni Stories',
      description: 'Success stories from our alumni studying abroad',
      href: '/higher-studies-opportunities/alumni',
      icon: Users,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Higher Studies & Global Opportunities | OIA - Medicaps University</title>
        <meta name="description" content="Resources and support for students pursuing higher studies abroad, including scholarships, LOR support, and ECTS conversion." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Higher Studies & Global Opportunities</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Comprehensive support for students pursuing master's, PhD, and other advanced degrees at 
              prestigious universities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-[#283887] mb-3" />
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={section.href}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Support Services */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#283887] mb-6">How We Support You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Application Support</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• University selection guidance</li>
                  <li>• Application form assistance</li>
                  <li>• Statement of Purpose (SOP) review</li>
                  <li>• Resume/CV preparation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Documentation</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Letter of Recommendation (LOR) support</li>
                  <li>• Transcript preparation</li>
                  <li>• Document verification</li>
                  <li>• ECTS credit conversion</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Financial Aid</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Scholarship information</li>
                  <li>• Financial aid guidance</li>
                  <li>• Loan application support</li>
                  <li>• Funding opportunities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Post-Admission</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Visa application guidance</li>
                  <li>• Pre-departure orientation</li>
                  <li>• Alumni network access</li>
                  <li>• Ongoing support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HigherStudies;
