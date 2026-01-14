import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, MapPin, Quote } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import Testimonials from '../../components/Testimonials';

const AlumniStories = () => {
  return (
    <>
      <Helmet>
        <title>Alumni Stories | Higher Studies & Global Opportunities - OIA</title>
        <meta name="description" content="Success stories from Medi-Caps alumni who pursued higher studies at prestigious universities worldwide." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Alumni Success Stories</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how Medi-Caps alumni are making their mark at top universities around the world.
            </p>
          </div>

          <Testimonials />

          {/* Featured Stories */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#283887] mb-6">Featured Alumni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Priya Sharma',
                  program: 'MS in Computer Science',
                  university: 'Stanford University, USA',
                  year: '2023',
                  quote: 'Medi-Caps provided me with a strong foundation that prepared me for graduate studies at Stanford. The international programs and research opportunities were invaluable.',
                },
                {
                  name: 'Rajesh Kumar',
                  program: 'MBA',
                  university: 'London Business School, UK',
                  year: '2022',
                  quote: 'The global perspective I gained through exchange programs at Medi-Caps helped me excel in my MBA program. The OIA team\'s support was exceptional.',
                },
                {
                  name: 'Anita Patel',
                  program: 'PhD in Engineering',
                  university: 'ETH Zurich, Switzerland',
                  year: '2024',
                  quote: 'The research collaboration opportunities and faculty guidance at Medi-Caps were crucial in my journey to pursuing a PhD at ETH Zurich.',
                },
              ].map((alumni, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-[#283887] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{alumni.name}</h3>
                        <p className="text-sm text-slate-600">{alumni.program}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {alumni.university} • {alumni.year}
                        </p>
                      </div>
                    </div>
                    <div className="relative pl-6">
                      <Quote className="absolute left-0 top-0 h-5 w-5 text-[#283887]/20" />
                      <p className="text-slate-700 italic">{alumni.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Share Your Story</h3>
              <p className="text-white/90 mb-4">
                Are you a Medi-Caps alumnus studying abroad? We'd love to feature your success story!
              </p>
              <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Contact Us
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AlumniStories;
