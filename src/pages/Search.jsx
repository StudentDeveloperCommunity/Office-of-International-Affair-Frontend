import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Loader2, FileText, Calendar, Globe, Users } from 'lucide-react';
import { useGlobalSearch } from '../hooks/useOIAData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Helmet } from 'react-helmet-async';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const { data: searchResults, isLoading } = useGlobalSearch(
    query,
    null,
    query.length >= 2
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length >= 2) {
      setSearchParams({ q: query });
    }
  };

  const typeIcons = {
    program: FileText,
    news: Calendar,
    event: Calendar,
    partnership: Globe,
  };

  const typeColors = {
    program: 'bg-blue-100 text-blue-800',
    news: 'bg-green-100 text-green-800',
    event: 'bg-purple-100 text-purple-800',
    partnership: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <>
      <Helmet>
        <title>Search | OIA - Medicaps University</title>
        <meta name="description" content="Search across programs, news, events, and partnerships." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-8">Search</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search programs, news, events, partnerships..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={query.length < 2}>
                Search
              </Button>
            </div>
          </form>

          {/* Results */}
          {query.length < 2 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Enter at least 2 characters to search</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
              <p className="text-slate-600">Searching...</p>
            </div>
          ) : searchResults?.results?.length > 0 ? (
            <div className="space-y-4">
              <p className="text-slate-600 mb-4">
                Found {searchResults.total} result{searchResults.total !== 1 ? 's' : ''}
              </p>
              {searchResults.results.map((result, idx) => {
                const Icon = typeIcons[result.type] || FileText;
                return (
                  <Link
                    key={idx}
                    to={result.url}
                    className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${typeColors[result.type] || 'bg-slate-100'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={typeColors[result.type] || 'bg-slate-100 text-slate-800'}>
                            {result.type}
                          </Badge>
                          <h3 className="font-semibold text-slate-900">{result.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm">{result.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Results Found</h3>
              <p className="text-slate-600">Try different keywords or check your spelling.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;


