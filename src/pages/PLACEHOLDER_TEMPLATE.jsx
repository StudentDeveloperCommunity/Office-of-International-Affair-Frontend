import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PLACEHOLDER = () => {
  return (
    <>
      <Helmet>
        <title>PAGE_TITLE | OIA - Medicaps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">PAGE_TITLE</h1>
          <p className="text-xl text-slate-600 mb-8">PAGE_DESCRIPTION</p>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-slate-600">This page is under development. Content will be available soon.</p>
            <Button asChild className="mt-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PLACEHOLDER;
