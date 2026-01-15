import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../lib/utils';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Route name mapping
  const routeNames = {
    'about-oia': 'About OIA',
    'global-partnerships': 'Global Partnerships',
    'student-mobility': 'Student Mobility',
    'outbound': 'Outbound Programs',
    'inbound': 'Inbound Programs',
    'eligibility': 'Eligibility & Selection',
    'apply': 'Apply for Mobility',
    'faculty-mobility-research': 'Faculty Mobility & Research',
    'international-admissions': 'International Admissions',
    'higher-studies-opportunities': 'Higher Studies & Global Opportunities',
    'international-student-support': 'International Student Support',
    'visits-delegations-events': 'Visits, Delegations & Events',
    'events': 'Events',
    'gallery': 'Gallery',
    'resources-systems': 'Resources & Systems',
    'news-media': 'News & Media',
    'news': 'News',
    'contact': 'Contact Us',
    'programs': 'Programs',
    'program': 'Program Details',
    'admin': 'Admin',
    'dashboard': 'Dashboard',
    'contacts': 'Contact Messages',
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-slate-600 hover:text-medicaps-blue transition-colors flex items-center"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = routeNames[name] || name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

            return (
              <li key={name} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />
                {isLast ? (
                  <span className="text-medicaps-blue font-medium" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-slate-600 hover:text-medicaps-blue transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;


