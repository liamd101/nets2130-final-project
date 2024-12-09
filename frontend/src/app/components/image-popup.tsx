import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import InlineVoteSystem from './upvote';

interface ImagePopupProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ src, alt, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="w-full h-[60vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              layout="responsive"
              width={800}
              height={600}
              objectFit="contain"
              className="w-full h-auto"
            />
          )}
        </div>
        <InlineVoteSystem initialVotes={0} />
      </div>
    </div>
  );
};

export default ImagePopup;
