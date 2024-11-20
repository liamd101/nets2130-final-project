"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Grid, User } from 'lucide-react';

const Header = () => {
  return (
    <div className="w-full relative">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent backdrop-blur-sm" />
      
      {/* Content */}
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo Section with enhanced glow */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
              <span className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                MemoryMosaic
              </span>
            </div>
          </Link>

          {/* Navigation Links with glass effect */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/events" 
              className="flex items-center space-x-2 text-gray-300/90 hover:text-purple-400 transition-colors duration-200 group"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-sm relative">
                Events
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
              </span>
            </Link>

            <Link 
              href="/my-mosaics" 
              className="flex items-center space-x-2 text-gray-300/90 hover:text-purple-400 transition-colors duration-200 group"
            >
              <Grid className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-sm relative">
                My Mosaics
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
              </span>
            </Link>

            {/* Account Button with enhanced glass effect */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black/20 border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-200 backdrop-blur-sm">
                <User className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">Account</span>
              </button>
              
              {/* Dropdown with glass morphism */}
              <div className="absolute right-0 mt-2 w-48 py-2 bg-black/40 border border-gray-800/50 rounded-lg backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5 rounded-lg" />
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 relative z-10">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 relative z-10">
                  Settings
                </a>
                <div className="border-t border-gray-800/50 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 relative z-10">
                  Sign Out
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Animated accent line with reduced opacity */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent">
        <div className="h-full w-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Header;