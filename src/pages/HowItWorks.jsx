import React from 'react';
import { CheckCircle, Clock, FileText, Users, Plane, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const applicationSteps = [
    {
      step: 1,
      title: "Submit Interest Form",
      description: "Fill out the initial application form with your basic details and program preferences",
      timeline: "15 minutes",
      requirements: ["Academic transcripts", "Personal statement", "Program preference"],
      icon: FileText,
      color: "bg-medicaps-blue"
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Our team reviews your academic credentials and eligibility for selected programs",
      timeline: "3-5 business days",
      requirements: ["CGPA verification", "Course compatibility check", "Language proficiency"],
      icon: CheckCircle,
      color: "bg-medicaps-red"
    },
    {
      step: 3,
      title: "Interview Process",
      description: "One-on-one interview with our international affairs team and partner university representatives",
      timeline: "1 week",
      requirements: ["Technical interview", "Language assessment", "Cultural readiness evaluation"],
      icon: Users,
      color: "bg-medicaps-blue"
    },
    {
      step: 4,
      title: "Approval & Selection",
      description: "Final selection based on interview performance and academic merit",
      timeline: "1-2 weeks",
      requirements: ["Merit-based selection", "Program capacity", "Partner university approval"],
      icon: GraduationCap,
      color: "bg-medicaps-red"
    },
    {
      step: 5,
      title: "Documentation & Visa",
      description: "Complete visa application process and pre-departure documentation",
      timeline: "4-6 weeks",
      requirements: ["Visa application", "Medical clearance", "Insurance coverage", "Travel arrangements"],
      icon: Plane,
      color: "bg-medicaps-blue"
    }
  ];



  const supportServices = [
    {
      title: "Pre-departure Orientation",
      description: "Comprehensive briefing on cultural adaptation, academic expectations, and practical tips",
      includes: ["Cultural orientation", "Academic system overview", "Safety guidelines", "Local customs"]
    },
    {
      title: "Visa Assistance",
      description: "End-to-end support for visa application process and documentation",
      includes: ["Application guidance", "Document preparation", "Interview preparation", "Status tracking"]
    },
    {
      title: "Financial Support",
      description: "Information about scholarships, grants, and financial aid opportunities",
      includes: ["Merit scholarships", "Need-based aid", "Education loans", "Currency exchange guidance"]
    },
    {
      title: "Accommodation Support",
      description: "Assistance in finding suitable housing options at your destination",
      includes: ["University hostels", "Homestay programs", "Shared accommodations", "Local housing"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section */}
      <section style={{backgroundColor: '#283887'}} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 style={{color: '#FFFFFF', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
            How It Works
          </h1>
          <p style={{color: '#FFFFFF', fontSize: '1.25rem', opacity: '0.9'}}>
            Your journey to international education made simple. Follow our step-by-step guide 
            from application to departure and beyond.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Application Process - Step by Step */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-medicaps-blue text-white mb-4 text-sm px-4 py-2">
              Step-by-Step Process
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 font-metropolis">
              Application Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From initial interest to program approval, here's exactly what happens at each stage
            </p>
          </div>

          <div className="space-y-8">
            {applicationSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.step} className="border-slate-200 shadow-lg overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Step Number & Icon */}
                    <div className={`${step.color} text-white p-8 lg:w-64 flex-shrink-0`}>
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 rounded-full p-3">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90 font-medium">Step {step.step}</div>
                          <div className="text-2xl font-bold font-metropolis break-words">{step.title}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="text-left">
                          <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4 text-medicaps-blue" />
                            <span className="font-medium">Timeline: {step.timeline}</span>
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <h4 className="font-semibold text-slate-900 mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {step.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                                <div className="w-2 h-2 bg-medicaps-blue rounded-full flex-shrink-0"></div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow for next step */}
                  {index < applicationSteps.length - 1 && (
                    <div className="flex justify-center pb-4">
                      <ArrowRight className="h-6 w-6 text-medicaps-blue" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* Student Support Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-medicaps-red text-white mb-4 text-sm px-4 py-2">
              Student Support
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 font-metropolis">
              Support Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive support from application to graduation and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportServices.map((service, index) => (
              <Card key={index} className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
                  <CardTitle className="text-xl font-metropolis text-left">{service.title}</CardTitle>
                  <CardDescription className="text-left">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-left">
                  <h4 className="font-medium text-slate-900 mb-3">What's Included:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-medicaps-blue flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section with 2 Action Buttons */}
        <section className="mt-20 text-center">
          <Card className="border-medicaps-blue shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-metropolis">
                Ready to Start Your International Journey?
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Take the first step towards global education. Our team is here to guide you through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/programs">
                  <Button size="lg" className="bg-medicaps-blue hover:bg-medicaps-blue/90 text-white">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Browse Programs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-medicaps-red text-medicaps-red hover:bg-medicaps-red hover:text-white">
                    <Users className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;