import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Filter, Calendar } from 'lucide-react';
import { useNews } from '../../hooks/useOIAData';
import NewsCard from '../../components/oia/NewsCard';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Helmet } from 'react-helmet-async';

const NewsMedia = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');

  const { data, isLoading, error } = useNews({
    category: category === 'all' ? undefined : category,
    page,
    page_size: 12,
    featured_only: featuredOnly,
    status: 'published'
  });

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
    setSearchParams({ 
      ...(value && value !== 'all' && { category: value }),
      ...(featuredOnly && { featured: 'true' }),
      page: '1' 
    });
  };

  const handleFeaturedToggle = () => {
    const newFeaturedOnly = !featuredOnly;
    setFeaturedOnly(newFeaturedOnly);
    setPage(1);
    setSearchParams({
      ...(category && category !== 'all' && { category }),
      ...(newFeaturedOnly && { featured: 'true' }),
      page: '1',
    });
  };

  const categories = ['Announcement', 'MoU', 'Achievement', 'Press Release'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading news...</p>
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
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading News</h3>
          <p className="text-slate-600">{error.message || 'Failed to load news articles'}</p>
        </div>
      </div>
    );
  }

  const newsItems = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <Helmet>
        <title>News & Media | Office of International Affairs - Medicaps University</title>
        <meta name="description" content="Stay updated with the latest news, announcements, MoU signings, achievements, and press releases from the Office of International Affairs." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">News & Media</h1>
            <p className="text-xl text-slate-600">
              Stay updated with the latest news, announcements, and achievements from the Office of International Affairs.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <Select 
              value={category || 'all'}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={featuredOnly ? 'default' : 'outline'}
              onClick={handleFeaturedToggle}
              className="ml-auto"
            >
              {featuredOnly ? 'Show All' : 'Featured Only'}
            </Button>
          </div>

          {/* News Grid */}
          {newsItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {newsItems.map((news) => (
                  <NewsCard key={news.id} news={news} featured={news.featured} />
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
              <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No News Found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsMedia;


