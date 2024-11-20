"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Heart, MessageCircle, Share2, Search, X } from "lucide-react";
import Header from "../components/header";
import {EnhancedOrbs} from "../components/enhanced-orbs";
import InlineVoteSystem from "../components/upvote";
import skyline from "../images/skyline.jpeg";
import blossom from "../images/blossoms.jpeg";
import winter from "../images/winter.jpg";
import Image from "next/image";
import { useState } from "react";

interface MosaicPost {
  id: number;
  title: string;
  date: string;
  image: any;
  likes: number;
  comments: number;
  shares: number;
}

const sampleMosaics: MosaicPost[] = [
  {
    id: 1,
    title: "Winter Memories 2024",
    date: "Dec 24, 2024",
    image: winter,
    likes: 124,
    comments: 15,
    shares: 8
  },
  {
    id: 2,
    title: "Summer Festival",
    date: "July 15, 2024",
    image: blossom,
    likes: 89,
    comments: 12,
    shares: 5
  },
  {
    id: 3,
    title: "City Nights",
    date: "Sep 30, 2024",
    image: skyline,
    likes: 256,
    comments: 34,
    shares: 21
  },
  // Add more as needed
];interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-md mx-auto mb-8"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-md transition-all duration-200 opacity-50 group-hover:opacity-75" />
          <div className="relative flex items-center bg-black/40 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
            <Search className="w-5 h-5 text-purple-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your mosaics..."
              className="w-full px-4 py-2 bg-transparent text-purple-300 placeholder-purple-400/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };
const MosaicCard = ({ mosaic }: { mosaic: MosaicPost }) => {
  return (
    <motion.div

    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all group"
  >
    {/* Image Container */}
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={mosaic.image}
        alt={mosaic.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-purple-300">
              {mosaic.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{mosaic.date}</span>
            </div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between pt-2">
          <InlineVoteSystem initialVotes={mosaic.likes} />
          
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="flex items-center space-x-1 hover:text-purple-300 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{mosaic.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-purple-300 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">{mosaic.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MyMosaicsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
  const [mosaics] = useState<MosaicPost[]>([
    {
      id: 1,
      title: "Winter Memories 2024",
      date: "Dec 24, 2024",
      image: winter,
      likes: 124,
      comments: 15,
      shares: 8
    },
    {
      id: 2,
      title: "Summer Festival",
      date: "July 15, 2024",
      image: blossom,
      likes: 89,
      comments: 12,
      shares: 5
    },
    {
      id: 3,
      title: "City Nights",
      date: "Sep 30, 2024",
      image: skyline,
      likes: 256,
      comments: 34,
      shares: 21
    },
  ]);

  const filteredMosaics = mosaics.filter((mosaic: MosaicPost) => 
    mosaic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mosaic.date.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="relative min-h-screen bg-black">
      <EnhancedOrbs />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
            >
              My Mosaics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-gray-400"
            >
              Your collection of memories
            </motion.p>
          </div>

          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Create New Mosaic Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-8 mx-auto block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-colors"
          >
            Create New Mosaic
          </motion.button>

          {/* No Results Message */}
          {filteredMosaics.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-400 py-8"
            >
              No mosaics found matching &quot;{searchQuery}&quot;
            </motion.div>
          )}

          {/* Mosaics Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredMosaics.map((mosaic) => (
                <motion.div
                  key={mosaic.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MosaicCard mosaic={mosaic} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );

};

export default MyMosaicsPage;