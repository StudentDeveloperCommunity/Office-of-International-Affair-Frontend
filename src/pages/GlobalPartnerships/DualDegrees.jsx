import React from 'react';
import { usePartnerships } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2, GraduationCap } from 'lucide-react';
import PartnershipCard from '../../components/oia/PartnershipCard';

const DualDegrees = () => {
  const { data, isLoading } = usePartnerships({ type: 'Dual Degree', page: 1, page_size: 20 });

  return (
    <>
      <Helmet>
        <title>Dual/Joint Degree Programs | Global Partnerships - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-[#283887]" />
              <h1 className="text-4xl font-bold text-[#283887]">Dual/Joint Degree Programs</h1>
            </div>
            <p className="text-xl text-slate-600">
              Earn degrees from both Medicaps University and our international partner institutions.
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

export default DualDegrees;
