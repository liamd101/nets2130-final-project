"use client";

import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import Header from "../components/header";
import { EnhancedOrbs } from "../components/enhanced-orbs";
import { useState, useRef } from "react";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  date: string;
}

interface ImageUpload {
  file: string | null;
  caption: string;
  eventId: number | null;
}

const sampleEvents: Event[] = [
  { id: 1, name: "Winter Memories 2024", date: "Dec 24, 2024" },
  { id: 2, name: "Summer Festival", date: "July 15, 2024" },
  { id: 3, name: "City Nights", date: "Sep 30, 2024" },
];

const ImageUploadPage = () => {
  const [uploadData, setUploadData] = useState<ImageUpload>({
    file: null,
    caption: "",
    eventId: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadData({ ...uploadData, file: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(uploadData);
    // Handle upload logic
  };

  return (
    <div className="relative min-h-screen bg-black">
      <EnhancedOrbs />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            Upload Images
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Selection */}
            <div className="space-y-2">
              <label className="text-purple-300">Select Event</label>
              <select
                value={uploadData.eventId || ""}
                onChange={(e) => setUploadData({ ...uploadData, eventId: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 backdrop-blur-sm outline-none"
                required
              >
                <option value="">Choose an event</option>
                {sampleEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {event.date}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-purple-300">Upload Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-96 rounded-lg border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden group"
              >
                {uploadData.file ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={uploadData.file}
                      alt="Upload preview"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400">
                    <Upload className="w-12 h-12 mb-2" />
                    <p>Click to upload image</p>
                    <p className="text-sm text-purple-400/70 mt-2">
                      Drag and drop or click to select
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-purple-300">Caption</label>
              <textarea
                value={uploadData.caption}
                onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 placeholder-purple-400/50 backdrop-blur-sm outline-none resize-none h-32"
                placeholder="Add a caption to your image..."
                required
              />
            </div>

            {/* Upload Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-colors"
              disabled={!uploadData.file || !uploadData.eventId}
            >
              Upload Image
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPage;