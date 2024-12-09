'use client';

import React from 'react';
import InlineVoteSystem from './upvote';
import Image from 'next/image';
import blossom from '../images/blossom.jpeg';

// Import all images
import img1 from '../images/img1.jpeg';
import img2 from '/images/img2.jpeg';
import img3 from '/images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';
import img6 from '../images/img6.jpeg';
import img7 from '../images/img7.jpeg';
import img8 from '../images/20241117_091929_2881B5.jpeg';
import img9 from '../images/20241117_091930_2BB798.jpeg';
import img10 from '../images/20241117_091930_20CC36.jpeg';
import img11 from '../images/20241117_091930_25B736.jpeg';
import img12 from '../images/20241117_091931_2E995B.jpeg';
import img13 from '../images/20241117_091931_2F74DC.jpeg';
import img14 from '../images/20241117_091931_23EA18.jpeg';
import img15 from '../images/20241117_091931_28D3E9.jpeg';
import img16 from '../images/20241117_091932_239E76.jpeg';
import img17 from '../images/20241117_091933_2E9258.jpeg';
import img18 from '../images/20241117_091933_214830.jpeg';
import img19 from '../images/20241117_091936_218A16.jpeg';
import img20 from '../images/20241117_113040_2D6A57.jpeg';

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
    const imageArray = [
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
    ];
    
    const initialImages = imageArray.map((src, i) => ({
      id: i + 1,
      src,
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

