'use client';
import React, { useEffect, useState } from 'react';
import InlineVoteSystem from '../components/upvote';
import sampleImage from '../images/winter.jpg';
import Image from 'next/image';
import Header from '../components/header';
import { EnhancedOrbs } from '../components/enhanced-orbs';

interface ImageItem {
    id: number;
    src: any;
    upvotes: number;
    size?: { cols: number; rows: number };
}

const ImageMosaic = () => {
    const [images, setImages] = useState<ImageItem[]>([]);

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

    useEffect(() => {
        const predefinedUpvotes = [
            282, 156, 298, 145, 267, 134, 201, 178, 289, 142,
            234, 167, 254, 123, 265, 187, 213, 159, 245, 176
        ];

        const initialImages = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            src: sampleImage,
            upvotes: predefinedUpvotes[i]
        }));

        setImages(calculateSizes(initialImages));
    }, []);

    if (images.length === 0) {
        return (
            <div className="relative min-h-screen bg-black">
                <EnhancedOrbs />
                <div className="relative z-10">
                    <Header />
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex items-center justify-center h-[600px]">
                            <div className="text-purple-300">Loading mosaic...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black">
            <EnhancedOrbs />
            <div className="relative z-10">
                <Header />
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Image Mosaic Gallery
                    </h1>
                    
                    <div className="max-w-7xl mx-auto">
                        <div className="w-full h-[600px] bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20">
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
                                                <div 
                                                    className="flex items-center justify-center text-white"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <InlineVoteSystem initialVotes={image.upvotes} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageMosaic;