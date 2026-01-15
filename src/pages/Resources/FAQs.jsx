import React, { useState, useMemo } from 'react';
import { useFAQs } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2, Search, HelpCircle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: faqs, isLoading } = useFAQs();

  const filteredFAQs = useMemo(() => {
    if (!faqs) return [];
    
    let filtered = faqs;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }
    
    // Sort by order and featured
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const categories = ['all', 'Admissions', 'Mobility', 'Visas', 'General', 'Partnerships'];
  const categoryColors = {
    'Admissions': 'bg-blue-100 text-blue-800',
    'Mobility': 'bg-green-100 text-green-800',
    'Visas': 'bg-yellow-100 text-yellow-800',
    'General': 'bg-slate-100 text-slate-800',
    'Partnerships': 'bg-purple-100 text-purple-800',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>FAQs | Resources & Systems - OIA</title>
        <meta name="description" content="Frequently asked questions about international programs, admissions, mobility, visas, and partnerships." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-slate-600">
              Find answers to common questions about our international programs and services.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FAQs List */}
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg shadow-sm px-6 border-slate-200">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      {faq.featured && (
                        <Badge className={`${categoryColors[faq.category] || 'bg-slate-100'} shrink-0 mt-1`}>
                          Featured
                        </Badge>
                      )}
                      <span className="font-semibold text-slate-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="prose prose-slate max-w-none text-slate-600">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {faq.answer}
                      </ReactMarkdown>
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No FAQs Found</h3>
              <p className="text-slate-600">
                {searchQuery ? 'Try adjusting your search query.' : 'FAQs will be available here.'}
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 bg-[#283887] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-6 text-white/90">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
