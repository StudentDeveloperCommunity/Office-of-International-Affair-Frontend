import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ExternalLink, ArrowLeft, Calendar } from 'lucide-react';
import { usePartnershipById } from '../../hooks/useOIAData';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PartnershipDetail = () => {
  const { id } = useParams();
  const { data: partnership, isLoading, error } = usePartnershipById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading partnership...</p>
        </div>
      </div>
    );
  }

  if (error || !partnership) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Partnership Not Found</h3>
          <Button asChild>
            <Link to="/global-partnerships">Back to Partnerships</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{partnership.partnerName} | Global Partnerships - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/global-partnerships">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partnerships
            </Link>
          </Button>

          <article className="bg-white rounded-lg shadow-sm p-8">
            {partnership.logo && (
              <img src={partnership.logo} alt={partnership.partnerName} className="h-24 mb-6" />
            )}
            <div className="flex items-center gap-4 mb-6">
              <Badge>{partnership.type}</Badge>
              <Badge>{partnership.status}</Badge>
            </div>
            <h1 className="text-4xl font-bold text-[#283887] mb-4">{partnership.partnerName}</h1>
            <div className="flex items-center gap-2 text-slate-600 mb-6">
              <MapPin className="h-5 w-5" />
              {partnership.country}
            </div>
            <div className="prose prose-slate max-w-none mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {partnership.details}
              </ReactMarkdown>
            </div>
            {partnership.website && (
              <Button asChild>
                <a href={partnership.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Partner Website
                </a>
              </Button>
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default PartnershipDetail;


