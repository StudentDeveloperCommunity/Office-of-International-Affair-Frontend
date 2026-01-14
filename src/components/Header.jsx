import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useGlobalSearch } from '../hooks/useOIAData';
import { cn } from '../lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Debounce search input to avoid too many queries
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Enable search when debounced query is 2+ characters
  const { data: searchResults, isLoading: isSearching } = useGlobalSearch(
    debouncedQuery,
    null,
    debouncedQuery.length >= 2
  );

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Measure left/right absolute containers and apply padding to centered container
  // Remove dynamic measurement logic for flexbox layout

  // Hierarchical navigation structure per PRD v2.0
  const navigation = [
    {
      name: 'About OIA',
      href: '/about-oia',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Vision & Mission', href: '/about-oia/vision-mission' },
        { name: 'Internationalization Strategy', href: '/about-oia/strategy' },
        { name: 'OIA Team', href: '/about-oia/team' },
        { name: 'Policies & Guidelines', href: '/about-oia/policies' },
      ],
    },
    {
      name: 'Global Partnerships',
      href: '/global-partnerships',
      hasDropdown: true,
      dropdownItems: [
        { name: 'MoUs & Strategic Partners', href: '/global-partnerships' },
        { name: 'Research Partnerships', href: '/global-partnerships/research' },
        { name: 'Dual/Joint Degrees', href: '/global-partnerships/dual-degrees' },
        { name: 'Industry/Embassy', href: '/global-partnerships/industry' },
        { name: 'Partner with Us', href: '/global-partnerships/partner' },
      ],
    },
    {
      name: 'Student Mobility',
      href: '/student-mobility',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Outbound Programs', href: '/student-mobility/outbound' },
        { name: 'Inbound Programs', href: '/student-mobility/inbound' },
        { name: 'Eligibility & Selection', href: '/student-mobility/eligibility' },
        { name: 'Credit Transfer Policy', href: '/student-mobility/credit-transfer' },
        { name: 'Apply for Mobility', href: '/student-mobility/apply' },
      ],
    },
    {
      name: 'Faculty & Research',
      href: '/faculty-mobility-research',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Visiting Faculty', href: '/faculty-mobility-research/visiting' },
        { name: 'Joint Projects', href: '/faculty-mobility-research/projects' },
        { name: 'Grants', href: '/faculty-mobility-research/grants' },
        { name: 'Faculty Abroad', href: '/faculty-mobility-research/abroad' },
        { name: 'Call for Proposals', href: '/faculty-mobility-research/proposals' },
      ],
    },
    {
      name: 'Admissions',
      href: '/international-admissions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Why Medi-Caps', href: '/international-admissions' },
        { name: 'Programs Offered', href: '/international-admissions/programs' },
        { name: 'Admission Process', href: '/international-admissions/process' },
        { name: 'Fees & Scholarships', href: '/international-admissions/fees' },
        { name: 'Visa & FRRO', href: '/international-admissions/visa' },
      ],
    },
    {
      name: 'Higher Studies',
      href: '/higher-studies-opportunities',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Study Abroad Guidance', href: '/higher-studies-opportunities' },
        { name: 'Scholarships', href: '/higher-studies-opportunities/scholarships' },
        { name: 'LOR Support', href: '/higher-studies-opportunities/lor' },
        { name: 'ECTS Conversion', href: '/higher-studies-opportunities/ects' },
        { name: 'Alumni Stories', href: '/higher-studies-opportunities/alumni' },
      ],
    },
    {
      name: 'Student Support',
      href: '/international-student-support',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Pre-arrival', href: '/international-student-support/pre-arrival' },
        { name: 'Orientation', href: '/international-student-support/orientation' },
        { name: 'Housing & Dining', href: '/international-student-support/housing' },
        { name: 'Health & Insurance', href: '/international-student-support/health' },
        { name: 'Cultural Engagement', href: '/international-student-support/cultural' },
      ],
    },
    {
      name: 'Events',
      href: '/visits-delegations-events',
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Events', href: '/visits-delegations-events' },
        { name: 'Gallery', href: '/visits-delegations-events/gallery' },
        { name: 'Conferences', href: '/visits-delegations-events?type=Conference' },
        { name: 'Webinars', href: '/visits-delegations-events?type=Webinar' },
      ],
    },
    {
      name: 'Resources',
      href: '/resources-systems',
      hasDropdown: true,
      dropdownItems: [
        { name: 'OIA SOPs', href: '/resources-systems/sops' },
        { name: 'Forms & Downloads', href: '/resources-systems/forms' },
        { name: 'FAQs', href: '/resources-systems/faqs' },
        { name: 'Contact Directory', href: '/resources-systems/contacts' },
      ],
    },
    {
      name: 'News & Media',
      href: '/news-media',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (url) => {
    navigate(url);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200 font-sans">
      <div className="flex items-center w-full h-20 m-4" style={{margin:0,padding:0}}>
        {/* Logo and Brand - flush left */}
        <div className="flex items-center flex-shrink-0 px-5 h-full" style={{marginLeft:5,paddingLeft:5}}>
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img
              src="https://www.medicaps.ac.in/public/frontend/images/logo.png"
              alt="Medicaps University"
              className="h-10 px-1.5 w-auto"
              style={{marginLeft:0,paddingLeft:0}}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120x48/283887/ffffff?text=MEDICAPS";
              }}
            />
            {/* Logo only - text removed as per request */}
          </Link>
        </div>

        {/* Centered Search - wide and visually prominent */}
        <div className="flex-1 flex justify-center items-center h-full">
          <form onSubmit={handleSearch} className="w-full max-w-sm relative">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search programs, news, events..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                className="pl-8 pr-2 w-full rounded-md border border-slate-200 bg-white shadow-none h-9 text-xs"
                style={{fontFamily:'inherit'}}
              />
            </div>
            {showSearchResults && searchQuery.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-slate-500">Searching...</div>
                ) : searchResults?.results?.length > 0 ? (
                  <div className="py-2">
                    {searchResults.results.map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(result.url)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 bg-[#283887]/10 text-[#283887] rounded">
                                {result.type}
                              </span>
                              <span className="font-medium text-slate-900">{result.title}</span>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2">{result.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="px-4 py-2 border-t border-slate-200">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleSearch}
                        className="w-full"
                      >
                        View all results
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-500">No results found</div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Nav - flush right, reduced item size and increased spacing */}
        <div className="flex items-center space-x-3 flex-shrink-0 h-full w-85" style={{margin:10,paddingRight:0}}>
          <nav className="hidden xl:flex items-center space-x-1">
            {navigation.slice(0, 6).map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center px-2 py-1 rounded-md font-medium transition-all duration-200 text-sm text-[#283887]",
                        isActive(item.href)
                          ? 'bg-[#283887] text-white shadow-sm'
                          : 'hover:bg-[#283887]/10'
                      )}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-slate-700 hover:bg-[#283887]/10 hover:text-[#283887] transition-colors text-sm"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-2 py-1 rounded-md font-medium transition-all duration-200 text-sm text-[#283887]",
                      isActive(item.href)
                        ? 'bg-[#283887] text-white shadow-sm'
                        : 'hover:bg-[#283887]/10'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="relative group">
              <button className="flex items-center px-2 py-1 rounded-md font-medium transition-all duration-200 text-sm text-[#283887] hover:bg-[#283887]/10">
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navigation.slice(6).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#283887]/10 hover:text-[#283887] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 py-4 max-h-[calc(100vh-100px)] overflow-y-auto">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </form>
            </div>

            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors text-sm",
                          isActive(item.href)
                            ? 'bg-[#283887] text-white'
                            : 'text-[#283887] hover:bg-[#283887]/10'
                        )}
                      >
                        {item.name}
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdowns[item.name] && "rotate-90"
                          )}
                        />
                      </button>
                      {openDropdowns[item.name] && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-slate-600 hover:text-[#283887] hover:bg-[#283887]/5 transition-colors rounded-lg"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg font-medium transition-colors text-sm",
                        isActive(item.href)
                          ? 'bg-[#283887] text-white'
                          : 'text-[#283887] hover:bg-[#283887]/10'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </header>
  );
}

export default Header;
