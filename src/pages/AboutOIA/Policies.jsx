import React from 'react';
import { useStaticContentByKey } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Policies = () => {
  const { data: content, isLoading } = useStaticContentByKey('policies');

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
        <title>Policies & Guidelines | About OIA</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {content ? (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-[#283887] mb-6">Policies & Guidelines</h1>
                <p className="text-slate-600">Policy documents will be available here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Policies;


