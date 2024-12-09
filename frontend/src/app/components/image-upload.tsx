"use client";

import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  eventId: number;
  onUploadComplete?: () => void;
}

export default function ImageUpload({ eventId, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/events/${eventId}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Upload failed');
      }

      onUploadComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
        disabled={uploading}
      />
      <label
        htmlFor="image-upload"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg 
          ${uploading 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-purple-500 hover:bg-purple-600 cursor-pointer'
          }`}
      >
        <Upload size={20} />
        {uploading ? 'Uploading...' : 'Upload Image'}
      </label>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
} 