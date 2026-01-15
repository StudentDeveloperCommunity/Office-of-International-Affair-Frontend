import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

const NewsCard = ({ news, featured = false }) => {
  const categoryColors = {
    'Announcement': 'bg-blue-100 text-blue-800',
    'MoU': 'bg-green-100 text-green-800',
    'Achievement': 'bg-yellow-100 text-yellow-800',
    'Press Release': 'bg-purple-100 text-purple-800',
  };

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x200/283887/ffffff?text=News';
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${imagePath}`;
  };

  return (
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${featured ? 'border-2 border-[#283887]' : ''}`}>
      {news.image && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={getImageUrl(news.image)}
            alt={news.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200/283887/ffffff?text=News';
            }}
          />
          {news.featured && (
            <Badge className="absolute top-2 right-2 bg-[#A21D2E] text-white">Featured</Badge>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={categoryColors[news.category] || 'bg-slate-100 text-slate-800'}>
            {news.category}
          </Badge>
          {news.featured && !news.image && (
            <Badge className="bg-[#A21D2E] text-white">Featured</Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{news.title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-xs mt-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(news.date), 'MMM dd, yyyy')}
          </span>
          {news.author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {news.author}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
          {news.content}
        </p>
        <Link
          to={`/news-media/${news.id}`}
          className="inline-flex items-center gap-2 text-[#283887] hover:text-[#A21D2E] font-medium text-sm transition-colors"
        >
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;


