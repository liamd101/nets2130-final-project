'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  aspectRatio: number;
  size?: { cols: number; rows: number };
}

const ImageMosaic: React.FC = () => {
  const predefinedUpvotes = Array(20).fill(0);
  const [images, setImages] = useState<ImageItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const calculateOptimalLayout = (images: ImageItem[], containerWidth: number, containerHeight: number): ImageItem[] => {
    const totalImages = images.length;
    const aspectRatio = containerWidth / containerHeight;
    
    const idealCols = Math.round(Math.sqrt(totalImages * aspectRatio));
    const idealRows = Math.ceil(totalImages / idealCols);
    
    const cellWidth = containerWidth / idealCols;
    const cellHeight = containerHeight / idealRows;

    const sortedImages = [...images].sort((a, b) => b.upvotes - a.upvotes);
    
    let grid: (ImageItem | null)[][] = Array(idealRows).fill(null).map(() => Array(idealCols).fill(null));
    
    sortedImages.forEach((img, index) => {
      const row = Math.floor(index / idealCols);
      const col = index % idealCols;
      
      let size = { cols: 1, rows: 1 };
      
      if (img.upvotes > sortedImages[Math.floor(totalImages * 0.2)].upvotes) {
        if (row < idealRows - 1 && col < idealCols - 1 && !grid[row][col + 1] && !grid[row + 1][col] && !grid[row + 1][col + 1]) {
          size = { cols: 2, rows: 2 };
          grid[row][col + 1] = grid[row + 1][col] = grid[row + 1][col + 1] = img;
        } else if (col < idealCols - 1 && !grid[row][col + 1]) {
          size = { cols: 2, rows: 1 };
          grid[row][col + 1] = img;
        }
      }
      
      grid[row][col] = { ...img, size };
    });
    
    return grid.flat().filter((img): img is ImageItem => img !== null);
  };

  useEffect(() => {
    const imageArray = [
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
    ];

    Promise.all(
      imageArray.map((src, index) => new Promise<ImageItem>((resolve) => {
          // Explicitly type the image object
          const img: HTMLImageElement = Object.assign(document.createElement('img'), {
              onload: function(this: HTMLImageElement) {
                  resolve({
                      id: index + 1,
                      src,
                      upvotes: predefinedUpvotes[index],
                      aspectRatio: this.width / this.height,
                  });
              }
          });
          img.src = src.src;
      }))
  ).then(loadedImages => {
      setImages(loadedImages);
  });
  }, []);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, []);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0 && images.length > 0) {
      setImages(prevImages => calculateOptimalLayout(prevImages, containerSize.width, containerSize.height));
    }
  }, [containerSize, images.length]);

  return (
    <div ref={containerRef} className="container mx-auto p-4">
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-1 p-1 w-full h-full">
          {images.map(image => (
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
                sizes={`(max-width: 768px) ${100 / 12 * (image.size?.cols || 1)}vw, 
                        (max-width: 1200px) ${50 / 12 * (image.size?.cols || 1)}vw, 
                        ${33 / 12 * (image.size?.cols || 1)}vw`}
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