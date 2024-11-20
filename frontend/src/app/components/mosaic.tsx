'use client';

import React from 'react';
import InlineVoteSystem from './upvote';
import sampleImage from '../images/sample.png';
import Image from 'next/image';

interface ImageItem {
  id: number;
  src: any;
  upvotes: number;
  size?: { cols: number; rows: number };
}

const ImageMosaic = () => {
  const calculateSizes = (images: ImageItem[]): ImageItem[] => {
    const maxUpvotes = Math.max(...images.map(img => img.upvotes));
    return images.map(img => {
      const ratio = img.upvotes / maxUpvotes;
      let size;
      if (ratio > 0.8) {
        size = { cols: 3, rows: 3 };
      } else if (ratio > 0.5) {
        size = { cols: 2, rows: 2 };
      } else {
        size = { cols: 1, rows: 1 };
      }
      return { ...img, size };
    });
  };

  const [images] = React.useState<ImageItem[]>(() => {
    const initialImages = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      src: sampleImage,
      upvotes: Math.floor(Math.random() * 300)
    }));
    return calculateSizes(initialImages);
  });

  return (
    <div className="container mx-auto p-4">
      <div className="w-full h-[600px] bg-gray-100 rounded-lg">
        <div className="grid grid-cols-12 auto-rows-[40px] gap-1 p-2">
          {images
            .sort((a, b) => b.upvotes - a.upvotes)
            .map(image => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                style={{
                  gridColumn: `span ${image.size?.cols || 1}`,
                  gridRow: `span ${image.size?.rows || 1}`,
                }}
              >
                <Image
                  src={image.src}
                  alt={`Image ${image.id}`}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-center text-white">
                    <InlineVoteSystem initialVotes={image.upvotes} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageMosaic;