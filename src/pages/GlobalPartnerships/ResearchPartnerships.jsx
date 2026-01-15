import React from 'react';
import { usePartnerships } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2, FlaskConical } from 'lucide-react';
import PartnershipCard from '../../components/oia/PartnershipCard';

const ResearchPartnerships = () => {
  const { data, isLoading } = usePartnerships({ type: 'Research', page: 1, page_size: 20 });

  return (
    <>
      <Helmet>
        <title>Research Partnerships | Global Partnerships - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="h-8 w-8 text-[#283887]" />
              <h1 className="text-4xl font-bold text-[#283887]">Research Partnerships</h1>
            </div>
            <p className="text-xl text-slate-600">
              Collaborative research initiatives with leading international institutions driving innovation 
              and academic excellence.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.items?.map((partnership) => (
                <PartnershipCard key={partnership.id} partnership={partnership} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResearchPartnerships;
