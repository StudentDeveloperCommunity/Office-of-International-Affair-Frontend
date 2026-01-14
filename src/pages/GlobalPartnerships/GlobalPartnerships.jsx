import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Filter, Globe } from 'lucide-react';
import { usePartnerships } from '../../hooks/useOIAData';
import PartnershipCard from '../../components/oia/PartnershipCard';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Helmet } from 'react-helmet-async';

const GlobalPartnerships = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  const apiType = type === 'all' ? undefined : (type || undefined);

  const { data, isLoading, error } = usePartnerships({
    type: apiType,
    country: country || undefined,
    page,
    page_size: 12,
  });

  const handleTypeChange = (value) => {
    const newType = value === 'all' ? 'all' : value;
    setType(newType);
    setPage(1);

    setSearchParams({
      ...(newType !== 'all' ? { type: newType } : {}),
      ...(country ? { country } : {}),
      page: '1'
    });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    setPage(1);
    setSearchParams({
      ...(type !== 'all' ? { type } : {}),
      ...(value ? { country: value } : {}),
      page: '1'
    });
  };

  const partnershipTypes = ['Strategic', 'Research', 'Dual Degree', 'Student Exchange'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading partnerships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Partnerships</h3>
          <p className="text-slate-600">{error.message || 'Failed to load partnerships'}</p>
        </div>
      </div>
    );
  }

  const partnerships = Array.isArray(data?.items) ? data.items : [];
  const totalPages = data?.totalPages ?? data?.total_pages ?? 1;

  return (
    <>
      <Helmet>
        <title>Global Partnerships | Office of International Affairs - Medicaps University</title>
        <meta name="description" content="Explore our strategic partnerships, MoUs, research collaborations, and dual degree programs with universities worldwide." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Global Partnerships</h1>
            <p className="text-xl text-slate-600">
              Building bridges across borders through strategic partnerships, research collaborations, and academic exchanges.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <Select 
              value={type} 
              onValueChange={handleTypeChange}
              defaultValue="all"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {partnershipTypes.map((ptype) => (
                  <SelectItem key={ptype} value={ptype}>
                    {ptype}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Filter by country..."
              value={country}
              onChange={handleCountryChange}
              className="w-[200px]"
            />
          </div>

          {/* Partnerships Grid */}
          {partnerships.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {partnerships.map((partnership) => (
                  <PartnershipCard key={partnership.id} partnership={partnership} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPage = Math.max(1, page - 1);
                      setPage(newPage);
                      setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
                    }}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPage = Math.min(totalPages, page + 1);
                      setPage(newPage);
                      setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
                    }}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Partnerships Found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalPartnerships;


