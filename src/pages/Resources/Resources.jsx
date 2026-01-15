import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { FileText, Download, HelpCircle, Users, Lock } from 'lucide-react';

const Resources = () => {
  const sections = [
    {
      title: 'OIA SOPs',
      description: 'Standard Operating Procedures and guidelines',
      href: '/resources-systems/sops',
      icon: FileText,
    },
    {
      title: 'Forms & Downloads',
      description: 'Downloadable forms and documents',
      href: '/resources-systems/forms',
      icon: Download,
    },
    {
      title: 'FAQs',
      description: 'Frequently asked questions',
      href: '/resources-systems/faqs',
      icon: HelpCircle,
    },
    {
      title: 'Contact Directory',
      description: 'Contact information for OIA staff',
      href: '/resources-systems/contacts',
      icon: Users,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Resources & Systems | OIA - Medicaps University</title>
        <meta name="description" content="Access OIA resources including SOPs, forms, FAQs, and contact directory." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Resources & Systems</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Access important documents, forms, procedures, and contact information for all your 
              international affairs needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                      <Link to={section.href}>Access</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Portal Teaser */}
          <Card className="bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6 text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Mobility Portal</h3>
              <p className="text-white/90 mb-4">
                Student login portal for managing applications and tracking status (Coming Soon)
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" disabled>
                Portal Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Resources;
