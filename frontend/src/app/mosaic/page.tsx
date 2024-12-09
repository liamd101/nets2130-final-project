'use client';

import NextImage from 'next/image';
import { useEffect, useState, useRef } from 'react';
import InlineVoteSystem from '../components/upvote';
import ImagePopup from '../components/image-popup';
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

interface Image {
    id: number;
    url: string;
    upvotes: number;
    position?: { x: number; y: number };
    width?: number;
    height?: number;
    rotation?: number;
}

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setContainerSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (containerSize.width > 0 && containerSize.height > 0 && images.length > 0) {
            const sortedImages = [...images].sort((a, b) => b.upvotes - a.upvotes);
            const centerX = containerSize.width / 2;
            const centerY = containerSize.height / 2;
            const maxUpvotes = sortedImages[0].upvotes;
            const minUpvotes = sortedImages[sortedImages.length - 1].upvotes;
            
            const maxSize = Math.min(containerSize.width, containerSize.height) * 0.35;
            const minSize = maxSize * 0.25;

            const layoutImages = sortedImages.map((img, index) => {
                const goldenRatio = (1 + Math.sqrt(5)) / 2;
                const theta = index * goldenRatio * Math.PI * 1.5;
                
                const spiralRadius = Math.sqrt(index) * (maxSize * 0.35);
                
                const sizeMultiplier = (img.upvotes - minUpvotes) / (maxUpvotes - minUpvotes);
                const baseSize = minSize + (maxSize - minSize) * sizeMultiplier;
                
                const randomOffset = Math.random() * 20 - 10;
                const x = centerX + Math.cos(theta) * (spiralRadius + randomOffset);
                const y = centerY + Math.sin(theta) * (spiralRadius + randomOffset);
                
                const rotation = (Math.random() - 0.5) * 15;

                return {
                    ...img,
                    width: baseSize,
                    height: baseSize,
                    position: {
                        x: x - baseSize / 2,
                        y: y - baseSize / 2
                    },
                    rotation
                };
            });

            setImages(layoutImages);
        }
    }, [containerSize]);

    useEffect(() => {
        const images = [
            { id: 1, url: img1.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 2, url: img2.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 3, url: img3.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 4, url: img4.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 5, url: img5.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 6, url: img6.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 7, url: img8.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 8, url: img9.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 9, url: img10.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 10, url: img11.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 11, url: img12.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 12, url: img13.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 13, url: img14.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 14, url: img16.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 15, url: img17.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 16, url: img18.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 17, url: img19.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 18, url: img20.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 19, url: img21.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 20, url: img24.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 21, url: img25.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 22, url: img26.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 23, url: img27.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 24, url: img28.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 25, url: img30.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 26, url: img31.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 27, url: img33.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 28, url: img34.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 29, url: img35.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 30, url: img37.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 31, url: img38.src, upvotes: Math.floor(Math.random() * 100) },
            { id: 32, url: img39.src, upvotes: Math.floor(Math.random() * 100) } 
        ];
        setImages(images);
    }, []);

    const handleImageClick = (event: React.MouseEvent, image: Image) => {
        if (!(event.target as HTMLElement).closest('.voting-system')) {
            setSelectedImage(image);
        }
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {images.map((img) => (
                <div
                    key={img.id}
                    className="absolute transition-all duration-300 ease-out cursor-pointer group"
                    style={{
                        left: img.position?.x,
                        top: img.position?.y,
                        width: img.width,
                        height: img.height,
                        zIndex: Math.floor(img.upvotes),
                    }}
                    onClick={(e) => handleImageClick(e, img)}
                >
                    <div
                        className="w-full h-full transition-all duration-300 ease-out group-hover:scale-125 group-hover:z-50"
                        style={{
                            transform: `rotate(${img.rotation}deg)`,
                            transformOrigin: 'center center',
                        }}
                    >
                        <NextImage
                            src={img.url}
                            alt={`Image ${img.id}`}
                            className="rounded-lg object-cover shadow-lg"
                            fill
                            sizes="(max-width: 768px) 100vw, 
                                   (max-width: 1024px) 50vw, 
                                   (max-width: 1536px) 33vw,
                                   25vw"
                        />
                    </div>
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-lg voting-system"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center text-white">
                            <InlineVoteSystem initialVotes={img.upvotes} />
                        </div>
                    </div>
                    
                </div>
            ))}
            {selectedImage && (
                <ImagePopup
                    src={selectedImage.url}
                    alt={`Image ${selectedImage.id}`}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default ImageGallery;