import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Calendar, Users, ExternalLink, GraduationCap, Globe, Award, DollarSign, Home, BookOpen, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { publicAPI } from '../services/api';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    purpose: false,
    benefits: false,
    eligibility: false,
    costs: false,
    accommodation: false
  });

  useEffect(() => {
    fetchProgramDetails();
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      setLoading(true);
      const data = await publicAPI.getPrograms({ page: 1, page_size: 100 });
      const programs = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
      const foundProgram = programs.find(p => p.id === id);
      
      if (foundProgram) {
        setProgram(foundProgram);
      } else {
        setError('Program not found');
      }
    } catch (err) {
      setError('Failed to load program details');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Enhanced program data with backend integration
  const getEnhancedProgramData = (program) => {
    return {
      purpose: program.purpose || "This exchange program is designed to provide students with global exposure, cultural immersion, and academic excellence. Students will gain international perspectives, develop cross-cultural competencies, and enhance their academic and professional profiles through world-class education.",
      
      vision: program.vision || "To create globally competent professionals who can contribute to society with international outlook, cultural sensitivity, and advanced academic knowledge.",
      
      benefits: program.benefits && program.benefits.length > 0 ? program.benefits : [
        "Credit Transfer: All academic credits earned abroad will be transferred and recognized by Medicaps University",
        "International Exposure: Experience different teaching methodologies and academic systems",
        "Career Impact: Enhanced employability with international experience and global network",
        "Cultural Learning: Deep immersion in different cultures and languages",
        "Personal Growth: Increased independence, confidence, and adaptability",
        "Professional Network: Build connections with international peers and faculty"
      ],
      
      eligibilitySimple: program.eligibilityDetailed && program.eligibilityDetailed.length > 0 ? program.eligibilityDetailed : [
        "Academic Performance: Maintain required CGPA/percentage as specified",
        "Language Proficiency: English proficiency may be required (IELTS/TOEFL)",
        "Financial Capability: Demonstrate ability to cover program costs",
        "Health Requirements: Medical clearance and insurance coverage",
        "Commitment: Willingness to complete the full program duration"
      ],
      
      costs: {
        tuitionFee: program.tuitionFee || "Varies by partner university (₹2,00,000 - ₹8,00,000 per semester)",
        livingExpenses: program.livingExpenses || "₹50,000 - ₹1,50,000 per month (accommodation, food, transport)",
        insurance: program.insurance || "₹15,000 - ₹25,000 for program duration",
        visaFees: program.visaFees || "₹8,000 - ₹15,000 (varies by country)",
        travel: program.travel || "₹40,000 - ₹1,20,000 (round trip airfare)"
      },
      
      scholarships: program.scholarships && program.scholarships.length > 0 ? program.scholarships : [
        "Medi-Caps Merit Scholarship: Up to 50% tuition fee waiver for top performers",
        "International Exchange Grant: ₹1,00,000 financial assistance for eligible students",
        "Need-based Support: Financial aid based on family income criteria"
      ],
      
      accommodation: program.accommodation && program.accommodation.length > 0 ? program.accommodation : [
        "University Hostels: On-campus accommodation with international student facilities",
        "Homestay Programs: Live with local families for cultural immersion",
        "Shared Apartments: Cost-effective option with other international students",
        "Private Accommodation: Independent housing options near campus"
      ]
    };
  };

  const getUniversityInfo = (program) => {
    // Use backend university data if available, otherwise fallback to hardcoded data
    if (program.universityFounded || program.universityRanking || program.universitySpecialties || program.campusInfo || program.studentBody) {
      return {
        founded: program.universityFounded || 'Established institution',
        ranking: program.universityRanking || 'Internationally recognized university',
        specialties: program.universitySpecialties && program.universitySpecialties.length > 0 ? program.universitySpecialties : ['Multiple disciplines'],
        campusSize: program.campusInfo || 'Modern campus facilities',
        studentBody: program.studentBody || 'Diverse international community'
      };
    }

    // Fallback to hardcoded data for existing programs
    const universityName = program.partnerUniversity;
    const universities = {
      'Technical University Munich, Germany': {
        founded: '1868',
        ranking: 'Top 50 Global Engineering Universities',
        specialties: ['Engineering', 'Technology', 'Applied Sciences'],
        campusSize: '600 hectares',
        studentBody: '45,000+ students from 120+ countries'
      },
      'University of Melbourne, Australia': {
        founded: '1853',
        ranking: '#1 University in Australia',
        specialties: ['Business', 'Medicine', 'Arts', 'Sciences'],
        campusSize: 'Multiple campuses across Melbourne',
        studentBody: '50,000+ students from 130+ countries'
      }
    };

    return universities[universityName] || {
      founded: 'Established institution',
      ranking: 'Internationally recognized university',
      specialties: ['Multiple disciplines'],
      campusSize: 'Modern campus facilities',
      studentBody: 'Diverse international community'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicaps-blue mx-auto mb-4"></div>
          <p className="text-slate-900 font-medium">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{error || 'Program Not Found'}</h3>
          <p className="text-slate-600 mb-6">The program you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/programs')} className="bg-medicaps-blue hover:bg-blue-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programs
          </Button>
        </div>
      </div>
    );
  }

  const enhancedData = getEnhancedProgramData(program);
  const universityInfo = getUniversityInfo(program);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              onClick={() => navigate('/programs')} 
              variant="outline"
              className="border-medicaps-blue text-medicaps-blue hover:bg-blue-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Button>
            <Badge className="bg-medicaps-red text-white">
              {program.status}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-metropolis">
            {program.title}
          </h1>
          <div className="flex items-center text-slate-700 text-lg">
            <MapPin className="h-5 w-5 mr-2 text-medicaps-blue" />
            {program.partnerUniversity}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Overview */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-medicaps-blue to-medicaps-blue/80 text-black">
                <CardTitle className="text-2xl font-metropolis">Program Overview</CardTitle>
                <CardDescription className="text-slate-800">
                  Comprehensive details about this exchange opportunity
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    {program.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-medicaps-blue mx-auto mb-2" />
                      <div className="text-sm font-medium text-slate-900">Duration</div>
                      <div className="text-sm text-slate-600">{program.duration}</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-medicaps-red mx-auto mb-2" />
                      <div className="text-sm font-medium text-slate-900">Deadline</div>
                      <div className="text-sm text-red-600 font-medium">{program.deadline}</div>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 text-medicaps-blue mx-auto mb-2" />
                      <div className="text-sm font-medium text-slate-900">Eligibility</div>
                      <div className="text-sm text-slate-600">View Details</div>
                    </div>
                    <div className="text-center">
                      <Globe className="h-8 w-8 text-medicaps-red mx-auto mb-2" />
                      <div className="text-sm font-medium text-slate-900">Country</div>
                      <div className="text-sm text-slate-600">{program.partnerUniversity.split(', ').pop()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partner University */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-medicaps-red to-medicaps-red/80 text-white">
                <CardTitle className="text-2xl font-metropolis flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3" />
                  Partner University
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{program.partnerUniversity}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">University Overview</h4>
                    <ul className="text-slate-600 space-y-1 text-sm">
                      <li><strong>Founded:</strong> {universityInfo.founded}</li>
                      <li><strong>Global Ranking:</strong> {universityInfo.ranking}</li>
                      <li><strong>Student Community:</strong> {universityInfo.studentBody}</li>
                      <li><strong>Campus:</strong> {universityInfo.campusSize}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {universityInfo.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Purpose & Vision */}
              <Card className="border-slate-200 shadow-lg">
                <Collapsible open={expandedSections.purpose} onOpenChange={() => toggleSection('purpose')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-metropolis flex items-center">
                          <Star className="h-5 w-5 mr-3 text-medicaps-blue" />
                          Purpose & Vision
                        </CardTitle>
                        {expandedSections.purpose ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="prose max-w-none">
                        <p className="text-slate-700 mb-4">{enhancedData.purpose}</p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-medicaps-blue mb-2">Vision</h4>
                          <p className="text-slate-700 text-sm">{enhancedData.vision}</p>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Benefits for Students */}
              <Card className="border-slate-200 shadow-lg">
                <Collapsible open={expandedSections.benefits} onOpenChange={() => toggleSection('benefits')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-metropolis flex items-center">
                          <Award className="h-5 w-5 mr-3 text-medicaps-red" />
                          Benefits for Students
                        </CardTitle>
                        {expandedSections.benefits ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enhancedData.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-2 h-2 bg-medicaps-blue rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-slate-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Eligibility Criteria */}
              <Card className="border-slate-200 shadow-lg">
                <Collapsible open={expandedSections.eligibility} onOpenChange={() => toggleSection('eligibility')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-metropolis flex items-center">
                          <Users className="h-5 w-5 mr-3 text-medicaps-blue" />
                          Eligibility Criteria
                        </CardTitle>
                        {expandedSections.eligibility ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-amber-800 mb-2">Basic Requirements</h4>
                        <p className="text-sm text-amber-700">{program.eligibility}</p>
                      </div>
                      
                      <h4 className="font-medium text-slate-900 mb-3">Detailed Eligibility Guidelines:</h4>
                      <div className="space-y-3">
                        {enhancedData.eligibilitySimple.map((criterion, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-medicaps-blue text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-slate-700">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Costs & Scholarships */}
              <Card className="border-slate-200 shadow-lg">
                <Collapsible open={expandedSections.costs} onOpenChange={() => toggleSection('costs')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-metropolis flex items-center">
                          <DollarSign className="h-5 w-5 mr-3 text-medicaps-red" />
                          Costs & Scholarships
                        </CardTitle>
                        {expandedSections.costs ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-3">Estimated Costs</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Tuition Fee:</span>
                              <span className="font-medium">{enhancedData.costs.tuitionFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Living Expenses:</span>
                              <span className="font-medium">{enhancedData.costs.livingExpenses}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Insurance:</span>
                              <span className="font-medium">{enhancedData.costs.insurance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Visa Fees:</span>
                              <span className="font-medium">{enhancedData.costs.visaFees}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Travel:</span>
                              <span className="font-medium">{enhancedData.costs.travel}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-slate-900 mb-3">Available Scholarships</h4>
                          <div className="space-y-2">
                            {enhancedData.scholarships.map((scholarship, index) => (
                              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800">{scholarship}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Accommodation Options */}
              <Card className="border-slate-200 shadow-lg">
                <Collapsible open={expandedSections.accommodation} onOpenChange={() => toggleSection('accommodation')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-metropolis flex items-center">
                          <Home className="h-5 w-5 mr-3 text-medicaps-blue" />
                          Accommodation Options
                        </CardTitle>
                        {expandedSections.accommodation ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enhancedData.accommodation.map((option, index) => (
                          <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <p className="text-sm text-slate-700">{option}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Now Card */}
            <Card className="border-medicaps-blue shadow-lg sticky top-4">
              <CardHeader className="bg-gradient-to-r from-medicaps-blue to-medicaps-red text-white text-center">
                <CardTitle className="text-xl font-metropolis">Ready to Apply?</CardTitle>
                <CardDescription className="text-blue-100">
                  Start your international journey today
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-medicaps-red mb-1">
                    {program.deadline}
                  </div>
                  <div className="text-sm text-slate-600">Application Deadline</div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-medicaps-blue hover:bg-medicaps-blue/90 mb-4"
                  onClick={() => window.open(program.applicationLink, '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Apply Now
                </Button>
                
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full border-medicaps-red text-medicaps-red hover:bg-red-400 hover:text-white">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Need Help? Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-metropolis">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Program Type:</span>
                  <Badge variant="outline">Exchange Program</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Credits:</span>
                  <span className="font-medium">Transferable</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Support:</span>
                  <span className="font-medium">24/7 Available</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-metropolis">Need Assistance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-slate-900">International Affairs Office</div>
                  <div className="text-medicaps-blue">international@medicaps.ac.in</div>
                  <div className="text-slate-600">+91 731 3111500</div>
                </div>
                <div className="text-xs text-slate-500">
                  Office Hours: Monday - Friday, 9:00 AM - 5:00 PM
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;