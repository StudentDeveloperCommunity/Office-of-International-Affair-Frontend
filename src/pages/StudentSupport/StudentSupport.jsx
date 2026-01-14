import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plane, Calendar, Home, Heart, Users, BookOpen } from 'lucide-react';

const StudentSupport = () => {
  const sections = [
    {
      title: 'Pre-arrival',
      description: 'Essential information before you arrive',
      href: '/international-student-support/pre-arrival',
      icon: Plane,
    },
    {
      title: 'Orientation',
      description: 'Welcome and orientation programs',
      href: '/international-student-support/orientation',
      icon: Calendar,
    },
    {
      title: 'Housing & Dining',
      description: 'Accommodation and meal options',
      href: '/international-student-support/housing',
      icon: Home,
    },
    {
      title: 'Health & Insurance',
      description: 'Healthcare services and insurance',
      href: '/international-student-support/health',
      icon: Heart,
    },
    {
      title: 'Cultural Engagement',
      description: 'Cultural activities and integration',
      href: '/international-student-support/cultural',
      icon: Users,
    },
  ];

  return (
    <>
      <Helmet>
        <title>International Student Support | OIA - Medicaps University</title>
        <meta name="description" content="Comprehensive support services for international students including pre-arrival, orientation, housing, health, and cultural engagement." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">International Student Support</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              We're committed to ensuring your smooth transition and success at Medicaps University. 
              From pre-arrival to graduation, we're here to support you every step of the way.
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
                      <Link to={section.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Support Services Overview */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#283887] mb-6">Our Support Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-[#283887]" />
                  Pre-arrival Support
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Visa application assistance</li>
                  <li>• Travel arrangements guidance</li>
                  <li>• Pre-departure checklist</li>
                  <li>• Airport pickup service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#283887]" />
                  Accommodation
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• On-campus hostel facilities</li>
                  <li>• Off-campus housing assistance</li>
                  <li>• Dining hall information</li>
                  <li>• Room allocation support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#283887]" />
                  Health & Wellness
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Health insurance guidance</li>
                  <li>• On-campus medical facilities</li>
                  <li>• Mental health support</li>
                  <li>• Emergency contact information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#283887]" />
                  Cultural Integration
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Cultural orientation programs</li>
                  <li>• Student clubs and societies</li>
                  <li>• Language support</li>
                  <li>• Peer mentoring program</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <Card className="mt-8 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-red-900 mb-2">24/7 Emergency Support</h3>
              <p className="text-red-800 text-sm mb-4">
                For emergencies, contact our 24/7 helpline: +91-731-1234567
              </p>
              <Button asChild variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                <Link to="/contact">Contact Support Team</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentSupport;
