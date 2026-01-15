import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Quote, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const Testimonials = () => {
  const [isOpen, setIsOpen] = useState(false);

  const testimonials = [
    {
      name: "Priya Sharma",
      program: "Engineering Exchange - Technical University Munich",
      year: "2023",
      rating: 5,
      quote: "My semester at TUM was life-changing. The advanced labs, international exposure, and cultural diversity helped me grow both academically and personally. I returned with a global perspective that has been invaluable in my career.",
      university: "Technical University Munich, Germany"
    },
    {
      name: "Rajesh Kumar", 
      program: "Business Studies - University of Melbourne",
      year: "2022",
      rating: 5,
      quote: "The business program at Melbourne opened doors I never imagined. The networking opportunities, real-world case studies, and exposure to the Australian market gave me insights that traditional classroom learning couldn't provide.",
      university: "University of Melbourne, Australia"
    },
    {
      name: "Ananya Patel",
      program: "Medical Research - University of Toronto",
      year: "2023",
      rating: 5,
      quote: "Working with leading medical researchers in Toronto was a dream come true. The research methodologies, clinical exposure, and collaborative environment enhanced my understanding of global healthcare practices tremendously.",
      university: "University of Toronto, Canada"
    },
    {
      name: "Arjun Singh",
      program: "Computer Science - MIT",
      year: "2022",
      rating: 5,
      quote: "Being at MIT was incredible. The cutting-edge research in AI and machine learning, access to brilliant minds, and the innovation ecosystem helped me develop skills that are now driving my startup success.",
      university: "Massachusetts Institute of Technology, USA"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-medicaps-blue/20 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer bg-gradient-to-r from-medicaps-blue to-medicaps-red text-white p-6 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-metropolis mb-2">Student Testimonials</h3>
                <p className="text-blue-100">Hear from our exchange program alumni</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-white text-medicaps-blue border-white font-medium">
                  {testimonials.length} Stories
                </Badge>
                {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-metropolis text-slate-900">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-medicaps-blue font-medium">
                          {testimonial.program}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="relative">
                      <Quote className="h-8 w-8 text-medicaps-blue/20 absolute -top-2 -left-1" />
                      <p className="text-slate-700 italic text-sm leading-relaxed pl-6 mb-4">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium">{testimonial.university}</span>
                      <span>Class of {testimonial.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-slate-700 text-sm mb-4 font-medium">
                Want to share your exchange experience? We'd love to hear your story!
              </p>
              <Button 
                variant="outline" 
                className="border-medicaps-blue text-medicaps-blue hover:bg-medicaps-blue hover:text-white"
              >
                Share Your Story
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Testimonials;