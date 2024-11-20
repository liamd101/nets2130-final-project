'use client';

import React from 'react';
import InlineVoteSystem from './upvote';
import sampleImage from '../images/sample.png';
import Image from 'next/image';

interface ImageItem {
  id: number;
  src: any;
  upvotes: number;
}

interface MosaicItemProps {
  item: ImageItem;
  size: 'small' | 'medium' | 'large';
}

const MosaicItem = ({ item, size }: MosaicItemProps) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-2',
    large: 'col-span-3 row-span-3'
  };

  return (
    <div className={`relative group ${sizeClasses[size]} aspect-square overflow-hidden rounded-lg`}>
      <Image
        src={sampleImage}
        alt={`Image ${item.id}`}
        className="object-cover transition-transform duration-200 group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={item.id === 1}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center justify-center text-white">
          <InlineVoteSystem initialVotes={item.upvotes} />
        </div>
      </div>
    </div>
  );
};

const ImageMosaic = () => {
  const [images] = React.useState<ImageItem[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      src: sampleImage,
      upvotes: [150, 50, 300, 200, 75, 250][i]
    }))
  );

  const getImageSize = (upvotes: number): 'small' | 'medium' | 'large' => {
    const maxUpvotes = Math.max(...images.map(img => img.upvotes));
    const ratio = upvotes / maxUpvotes;
    
    if (ratio > 0.66) return 'large';
    if (ratio > 0.33) return 'medium';
    return 'small';
  };

  return (
    <div className="grid grid-cols-6 auto-rows-fr gap-4 p-4">
      {images
        .sort((a, b) => b.upvotes - a.upvotes)
        .map(image => (
          <MosaicItem
            key={image.id}
            item={image}
            size={getImageSize(image.upvotes)}
          />
        ))}
    </div>
  );
};

export default ImageMosaic;