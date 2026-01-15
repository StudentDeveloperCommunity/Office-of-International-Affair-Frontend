import React, { useState } from 'react';
import { Loader2, Image as ImageIcon, Filter } from 'lucide-react';
import { useGallery } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-masonry-css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('all');
  const { data, isLoading, error } = useGallery({ category: category === 'all' ? undefined : category, page: 1, page_size: 50 });

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x300/283887/ffffff?text=Image';
    
    // If it's already a full URL (starts with http), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, construct the full URL using the backend API base URL
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    return `${baseUrl}/${cleanPath}`;
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
          <p className="text-slate-600">Loading gallery...</p>
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
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Gallery</h3>
          <p className="text-slate-600">{error.message || 'Failed to load gallery'}</p>
        </div>
      </div>
    );
  }

  const images = data?.items || [];

  return (
    <>
      <Helmet>
        <title>Gallery | Events - OIA</title>
        <meta name="description" content="Browse our photo gallery showcasing events, delegations, and activities organized by the Office of International Affairs." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Photo Gallery</h1>
            <p className="text-xl text-slate-600 mb-6">
              Explore moments from our events, delegations, and international activities.
            </p>
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filter by Category:</span>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Campus">Campus</SelectItem>
                  <SelectItem value="Partnerships">Partnerships</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Delegations">Delegations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {images.length > 0 ? (
            <>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-4"
                columnClassName="pl-4 bg-clip-padding"
              >
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 cursor-pointer group"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.caption || item.alt}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/283887/ffffff?text=Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end">
                        {item.caption && (
                          <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>

              {/* Lightbox Modal */}
              {selectedImage && (
                <div
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="max-w-4xl max-h-full">
                    <img
                      src={getImageUrl(selectedImage.image)}
                      alt={selectedImage.caption || selectedImage.alt}
                      className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    />
                    {selectedImage.caption && (
                      <p className="text-white text-center mt-4">{selectedImage.caption}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Images Available</h3>
              <p className="text-slate-600">Gallery images will appear here once they are uploaded.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;


