import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Target, Users, FileText, BookOpen } from 'lucide-react';

const AboutOIA = () => {
  const sections = [
    {
      title: 'Vision & Mission',
      description: 'Our commitment to global education and international collaboration',
      href: '/about-oia/vision-mission',
      icon: Target,
    },
    {
      title: 'Internationalization Strategy',
      description: 'Our roadmap for global engagement and partnerships',
      href: '/about-oia/strategy',
      icon: BookOpen,
    },
    {
      title: 'OIA Team',
      description: 'Meet our dedicated team of international affairs professionals',
      href: '/about-oia/team',
      icon: Users,
    },
    {
      title: 'Policies & Guidelines',
      description: 'Important policies, guidelines, and procedures',
      href: '/about-oia/policies',
      icon: FileText,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About OIA | Office of International Affairs - Medicaps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">About OIA</h1>
          <p className="text-xl text-slate-600 mb-12">
            The Office of International Affairs (OIA) serves as the central hub for all international activities,
            partnerships, and student mobility programs at Medicaps University.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-8 w-8 text-[#283887] mb-2" />
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link to={section.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutOIA;


