import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { GraduationCap, Users, DollarSign, Plane, FileText, Lightbulb } from 'lucide-react';

const FacultyMobility = () => {
  const sections = [
    {
      title: 'Visiting Faculty',
      description: 'Opportunities for international faculty to visit and teach at Medi-Caps',
      href: '/faculty-mobility-research/visiting',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Joint Projects',
      description: 'Collaborative research projects with international partners',
      href: '/faculty-mobility-research/projects',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Grants',
      description: 'Funding opportunities for international research and collaboration',
      href: '/faculty-mobility-research/grants',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Faculty Abroad',
      description: 'Programs for Medi-Caps faculty to teach and research internationally',
      href: '/faculty-mobility-research/abroad',
      icon: Plane,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Call for Proposals',
      description: 'Submit research proposals for international collaboration',
      href: '/faculty-mobility-research/proposals',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Faculty Mobility & Research | OIA - Medicaps University</title>
        <meta name="description" content="Explore faculty exchange programs, research collaborations, grants, and international opportunities for faculty members." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Faculty Mobility & Research</h1>
            <p className="text-xl text-slate-600 max-w-3xl">
              Empowering faculty members with international research opportunities, exchange programs, 
              and collaborative projects that enhance academic excellence and global impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${section.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${section.color}`} />
                    </div>
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

          {/* Key Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#283887] mb-6">Benefits of Faculty Mobility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-[#283887] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Research Excellence</h3>
                  <p className="text-slate-600 text-sm">
                    Access to world-class research facilities and collaboration with leading international researchers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-[#283887] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Global Network</h3>
                  <p className="text-slate-600 text-sm">
                    Build international connections and expand your professional network across borders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-6 w-6 text-[#283887] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Teaching Excellence</h3>
                  <p className="text-slate-600 text-sm">
                    Experience diverse teaching methodologies and enhance your pedagogical skills.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <DollarSign className="h-6 w-6 text-[#283887] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Funding Opportunities</h3>
                  <p className="text-slate-600 text-sm">
                    Access to international grants and funding for research projects and collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#283887] mb-2">50+</div>
                <div className="text-sm text-slate-600">Active Collaborations</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#283887] mb-2">25+</div>
                <div className="text-sm text-slate-600">Research Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#283887] mb-2">15+</div>
                <div className="text-sm text-slate-600">Countries</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#283887] mb-2">100+</div>
                <div className="text-sm text-slate-600">Faculty Exchanges</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyMobility;
