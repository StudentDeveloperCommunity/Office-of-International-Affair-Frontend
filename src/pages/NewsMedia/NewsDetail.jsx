import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, FileText } from 'lucide-react';
import { useNewsById } from '../../hooks/useOIAData';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NewsDetail = () => {
  const { id } = useParams();
  const { data: news, isLoading, error } = useNewsById(id);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Article Not Found</h3>
          <p className="text-slate-600 mb-4">The news article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/news-media">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryColors = {
    'Announcement': 'bg-blue-100 text-blue-800',
    'MoU': 'bg-green-100 text-green-800',
    'Achievement': 'bg-yellow-100 text-yellow-800',
    'Press Release': 'bg-purple-100 text-purple-800',
  };

  return (
    <>
      <Helmet>
        <title>{news.title} | News & Media - OIA</title>
        <meta name="description" content={news.content.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/news-media">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </Button>

          {/* Article */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header Image */}
            {news.image && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={getImageUrl(news.image)}
                  alt={news.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/283887/ffffff?text=News';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <Badge className={categoryColors[news.category] || 'bg-slate-100 text-slate-800'}>
                  {news.category}
                </Badge>
                {news.featured && (
                  <Badge className="bg-[#A21D2E] text-white">Featured</Badge>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(news.date), 'MMMM dd, yyyy')}
                </div>
                {news.author && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="h-4 w-4" />
                    {news.author}
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-[#283887] mb-6">{news.title}</h1>

              {/* Content */}
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {news.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {news.tags && news.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Document */}
              {news.file && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <a
                    href={news.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#283887] hover:text-[#A21D2E] font-medium transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    Download PDF Document
                  </a>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;


