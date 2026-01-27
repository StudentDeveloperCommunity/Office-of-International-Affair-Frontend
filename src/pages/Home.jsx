import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, BookOpen, Award, MapPin, Plane, Loader2, ExternalLink, Clock, Calendar, TrendingUp, Building2, GraduationCap, Newspaper } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePrograms, useExtendedStats, useNews, useTeam, useFAQs } from '../hooks/useOIAData';
import NewsCard from '../components/oia/NewsCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { data: programsData, isLoading: programsLoading } = usePrograms({ page: 1, page_size: 12 });
  const { data: stats, isLoading: statsLoading } = useExtendedStats();
  const { data: newsData, isLoading: newsLoading } = useNews({ featured_only: true, page: 1, page_size: 5 });
  const { data: teamData, isLoading: teamLoading } = useTeam();
  const { data: faqsData, isLoading: faqsLoading } = useFAQs();

  const programs = programsData?.items || [];
  const news = newsData?.items || [];
  const featuredPrograms = programs.slice(0, 12);
  const team = teamData?.items || teamData || [];
  const faqs = faqsData?.items || faqsData || [];

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    const fullUrl = `${baseUrl}${imagePath}`;
    
    // Add cache-busting timestamp to prevent showing cached/removed images
    return `${fullUrl}?t=${Date.now()}`;
  };

  return (
    <>
      <Helmet>
        <title>Home | Office of International Affairs - Medicaps University</title>
        <meta name="description" content="Medicaps University Office of International Affairs - Your gateway to global education, student exchange programs, and international partnerships." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-[#283887]/10 text-[#283887] border-[#283887]/20">
                    <Globe className="h-4 w-4 mr-2" />
                    Global Education Initiative
                  </Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                    Office of International
                    <span className="text-[#283887] block">Affairs</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                    Empowering students and faculty with world-class international opportunities. 
                    Connect with prestigious universities globally and shape your future through 
                    transformative exchange programs.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-[#283887] hover:bg-[#283887]/90 text-white">
                    <Link to="/student-mobility">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Explore Programs
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-[#A21D2E] text-[#A21D2E] hover:bg-[#A21D2E]/10">
                    <Link to="/contact">
                      <Users className="h-5 w-5 mr-2" />
                      Get Counseling
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-2xl shadow-2xl p-12 text-center bg-gradient-to-br from-[#283887] to-[#A21D2E]">
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/20">
                      <Globe className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Global Education Hub
                    </h3>
                    <p className="text-white/90">
                      Connecting students and faculty with international opportunities
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Award className="h-8 w-8 mx-auto mb-2 text-white" />
                      <div className="text-white text-sm font-medium">Excellence</div>
                    </div>
                    <div>
                      <Users className="h-8 w-8 mx-auto mb-2 text-white" />
                      <div className="text-white text-sm font-medium">Community</div>
                    </div>
                    <div>
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-white" />
                      <div className="text-white text-sm font-medium">Learning</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#283887]/10 rounded-full opacity-20 -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#A21D2E]/10 rounded-full opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {statsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
              </div>
            ) : stats ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.totalPrograms || 0}</div>
                  <div className="text-sm text-slate-600">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.partnerUniversities || 0}</div>
                  <div className="text-sm text-slate-600">Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.activePartnerships || 0}</div>
                  <div className="text-sm text-slate-600">Active MoUs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.studentsExchanged || 0}</div>
                  <div className="text-sm text-slate-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.countries || 0}</div>
                  <div className="text-sm text-slate-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.totalEvents || 0}</div>
                  <div className="text-sm text-slate-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#283887] mb-2">{stats.newsArticles || 0}</div>
                  <div className="text-sm text-slate-600">News</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Latest News Carousel */}
        {news.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="bg-[#A21D2E]/10 text-[#A21D2E] border-[#A21D2E]/20 mb-4">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Latest News
                </Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  News & Updates
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Stay informed about the latest announcements, achievements, and partnerships.
                </p>
              </div>

              {newsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
                </div>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {news.map((item) => (
                      <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <NewsCard news={item} featured={item.featured} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link to="/news-media">
                    View All News
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Featured Programs Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="bg-[#283887]/10 text-[#283887] border-[#283887]/20 mb-4">
                <Award className="h-4 w-4 mr-2" />
                Featured Programs
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Popular Exchange Programs
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover our most sought-after international exchange opportunities designed to 
                provide you with global exposure and academic excellence.
              </p>
            </div>

            {programsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
              </div>
            ) : featuredPrograms.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredPrograms.map((program) => (
                    <CarouselItem key={program.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden border-l-4 border-[#283887] h-full">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-[#283887]/5 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#283887] text-white">
                              {program.status}
                            </Badge>
                            <Badge variant="outline" className="text-[#A21D2E] border-[#A21D2E] text-xs">
                              {program.deadline}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-[#283887] transition-colors line-clamp-2">
                            {program.title}
                          </CardTitle>
                          <div className="flex items-center text-slate-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-[#283887]" />
                            {program.partnerUniversity}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4 p-6">
                          <CardDescription className="line-clamp-3 text-slate-600">
                            {program.description}
                          </CardDescription>
                          
                          <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center text-slate-600">
                                <Clock className="h-4 w-4 mr-1 text-[#283887]" />
                                Duration:
                              </span>
                              <span className="font-medium text-slate-900">{program.duration}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center text-slate-600">
                                <Calendar className="h-4 w-4 mr-1 text-[#A21D2E]" />
                                Deadline:
                              </span>
                              <span className="font-medium text-[#A21D2E]">{program.deadline}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Link to={`/program/${program.id}`}>
                              <Button className="w-full bg-[#283887] hover:bg-[#283887]/90 text-white">
                                View Details
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="w-full border-[#A21D2E] text-[#A21D2E] hover:bg-[#A21D2E] hover:text-white"
                              onClick={() => window.open(program.applicationLink, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No programs available at the moment.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-[#283887] text-[#283887] hover:bg-[#283887] hover:text-white">
                <Link to="/programs">
                  View All Programs
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Explore Our Services
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive support for your international education journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to="/student-mobility">
                  <CardHeader>
                    <Plane className="h-10 w-10 text-[#283887] mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>Student Mobility</CardTitle>
                    <CardDescription>Exchange programs for students</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to="/faculty-mobility-research">
                  <CardHeader>
                    <GraduationCap className="h-10 w-10 text-[#283887] mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>Faculty & Research</CardTitle>
                    <CardDescription>Faculty exchange and research</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to="/international-admissions">
                  <CardHeader>
                    <Building2 className="h-10 w-10 text-[#283887] mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>Admissions</CardTitle>
                    <CardDescription>International student admissions</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to="/global-partnerships">
                  <CardHeader>
                    <Building2 className="h-10 w-10 text-[#283887] mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>Partnerships</CardTitle>
                    <CardDescription>Global university partnerships</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to="/visits-delegations-events/gallery">
                  <CardHeader>
                    <Calendar className="h-10 w-10 text-[#283887] mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>Gallery</CardTitle>
                    <CardDescription>Events & activities photos</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Choose Medicaps International Programs?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                25 years of academic excellence, trusted partnerships, and a commitment to student success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-[#283887]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-[#283887]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Global Network</h3>
                  <p className="text-slate-600">
                    Partnerships with prestigious universities across multiple countries worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-[#283887]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#283887]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Guidance</h3>
                  <p className="text-slate-600">
                    Dedicated counselors to help you choose the right program and navigate applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-[#283887]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-[#283887]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Quality Assurance</h3>
                  <p className="text-slate-600">
                    All programs are carefully vetted to ensure academic excellence and student safety.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {team.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="bg-[#283887]/10 text-[#283887] border-[#283887]/20 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  Meet Our Team
                </Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  OIA Leadership Team
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Meet the dedicated professionals guiding your international education journey.
                </p>
              </div>

              {teamLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.slice(0, 8).map((member) => (
                    <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6 pb-6">
                        {member.image ? (
                          <img
                            src={getImageUrl(member.image)}
                            alt={member.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-20 h-20 bg-gradient-to-br from-[#283887] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold"
                          style={{ display: member.image ? 'none' : 'flex' }}
                        >
                          {member.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{member.name}</h3>
                        <p className="text-sm text-[#283887] font-medium mb-2">{member.position}</p>
                        <p className="text-sm text-slate-600">{member.department}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link to="/about-oia/team">
                    View Full Team
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {faqs.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="bg-[#A21D2E]/10 text-[#A21D2E] border-[#A21D2E]/20 mb-4">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Quick Answers
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Find answers to common questions about our international programs.
                </p>
              </div>

              {faqsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {faqs.slice(0, 6).map((faq) => (
                    <Card key={faq.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                        <p className="text-slate-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources/faqs">
                    View All FAQs
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
