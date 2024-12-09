'use client';

import React, { useState, useEffect, useRef } from 'react';
import InlineVoteSystem from '../components/upvote';
import Image from 'next/image';

import img1 from '../images/img1.jpeg';
import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';
import img6 from '../images/img6.jpeg';
import img8 from '../images/img8.jpeg';
import img9 from '../images/img9.jpeg';
import img10 from '../images/img10.jpeg';
import img11 from '../images/img11.jpeg';
import img12 from '../images/img12.jpeg';
import img13 from '../images/img13.jpeg';
import img14 from '../images/img14.jpeg';
import img16 from '../images/img16.jpeg';
import img17 from '../images/img17.jpeg';
import img18 from '../images/img18.jpeg';
import img19 from '../images/img19.jpeg';
import img20 from '../images/img20.jpeg';
import img21 from '../images/img21.jpeg';
import img24 from '../images/img24.jpeg';
import img25 from '../images/img25.jpeg';
import img26 from '../images/img26.jpeg';
import img27 from '../images/img27.jpeg';
import img28 from '../images/img28.jpeg';
import img30 from '../images/img30.jpeg';
import img31 from '../images/img31.jpeg';
import img33 from '../images/img33.jpeg';
import img34 from '../images/img34.jpeg';
import img35 from '../images/img35.jpeg';
import img37 from '../images/img37.jpeg';
import img38 from '../images/img38.jpeg';
import img39 from '../images/img39.jpeg';

interface ImageItem {
    id: number;
    src: any;
    upvotes: number;
    aspectRatio: number;
    size?: { cols: number; rows: number };
}

const ImageMosaic = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const calculateOptimalLayout = (images: ImageItem[], containerWidth: number, containerHeight: number): ImageItem[] => {
        const totalImages = images.length;
        const aspectRatio = containerWidth / containerHeight;
        
        // Calculate the ideal number of columns and rows
        const idealCols = Math.max(1, Math.round(Math.sqrt(totalImages * aspectRatio)));
        const idealRows = Math.max(1, Math.ceil(totalImages / idealCols));
        
        const cellWidth = containerWidth / idealCols;
        const cellHeight = containerHeight / idealRows;

        // Sort images by upvotes
        const sortedImages = [...images].sort((a, b) => b.upvotes - a.upvotes);
        
        let grid: (ImageItem | null)[][] = Array(idealRows).fill(null).map(() => Array(idealCols).fill(null));
        
        sortedImages.forEach((img, index) => {
            const row = Math.floor(index / idealCols);
            const col = index % idealCols;
            
            let size = { cols: 1, rows: 1 };
            
            // Check if we can expand this image
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
        const predefinedUpvotes = [
            282, 156, 298, 145, 267, 134, 201, 178, 289, 142,
            234, 167, 254, 123, 265, 187, 213, 159, 245, 176,
            200, 190, 180, 170, 160, 150, 140, 130, 120, 110,
            100, 90, 80
        ];

        const imageArray = [
            img1, img2, img3, img4, img5, img6, img8, img9, img10, img11, img12, img13, img14, img16, img17, img18, img19, img20, img21, img24, img25, img26, img27, img28, img30, img31, img33, img34, img35, img37, img38, img39
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
        if (containerSize.width > 0 && containerSize.height > 0) {
            setImages(prevImages => calculateOptimalLayout(prevImages, containerSize.width, containerSize.height));
        }
    }, [containerSize]);

    return (
        <div ref={containerRef} className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map(image => (
                    <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-lg cursor-pointer"
                        style={{
                            aspectRatio: '16/9',  // Force landscape aspect ratio
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={image.src}
                                alt={`Image ${image.id}`}
                                className="object-cover"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 100vw, 
                                       (max-width: 1024px) 50vw, 
                                       (max-width: 1536px) 33vw,
                                       25vw"
                            />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="flex items-center justify-center text-white">
                                <InlineVoteSystem initialVotes={image.upvotes} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageMosaic;

