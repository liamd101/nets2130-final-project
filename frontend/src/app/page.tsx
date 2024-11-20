"use client";

import Image from "next/image";
import InlineVoteSystem from "./components/upvote";
import ImageMosaic from "./components/mosaic";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 opacity-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/20"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{ 
            y: [null, Math.random() * -100],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const CyberGrid = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"
          animate={{ 
            background: [
              "linear-gradient(to right, rgba(168,85,247,0.05), rgba(59,130,246,0.05))",
              "linear-gradient(to right, rgba(59,130,246,0.05), rgba(168,85,247,0.05))"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
};

const GlowingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [-200, window.innerWidth],
          y: [-200, window.innerHeight],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [window.innerWidth, -200],
          y: [window.innerHeight, -200],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    </div>
  );
};

const ScanLines = () => (
  <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InNjYW5saW5lIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyIj4KPGxpbmUgeDE9IjAiIHkxPSIxIiB4Mj0iMTAwJSIgeTI9IjEiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc2F0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3NjYW5saW5lKSIvPgo8L3N2Zz4=')] opacity-20" />
);

const InteractiveCorners = () => {
  return (
    <>
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500/20"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-500/20"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />
    </>
  );
};

const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large primary orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [-200, window.innerWidth],
          y: [-200, window.innerHeight],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Secondary orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(59,130,246,0.2)' : 'rgba(147,51,234,0.2)'} 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{
            x: [i * 300, window.innerWidth - i * 200],
            y: [i * 200, window.innerHeight - i * 300],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Smaller accent orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute w-[150px] h-[150px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(147,51,234,0.15)' : 'rgba(59,130,246,0.15)'} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            x: [i * 100, window.innerWidth - i * 150],
            y: [i * 150, window.innerHeight - i * 100],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i,
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
    </div>
  );
};
const EnhancedOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary large orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(147,51,234,0.1) 40%, transparent 70%)",
          filter: "blur(30px)",
          boxShadow: "0 0 80px rgba(147,51,234,0.3)",
        }}
        animate={{
          x: [-400, window.innerWidth - 400],
          y: [-400, window.innerHeight - 400],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Large blue orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
          filter: "blur(30px)",
          boxShadow: "0 0 60px rgba(59,130,246,0.3)",
        }}
        animate={{
          x: [window.innerWidth, -200],
          y: [window.innerHeight, -200],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Medium accent orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`medium-${i}`}
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 
                ? 'rgba(147,51,234,0.35)' 
                : 'rgba(59,130,246,0.35)'
            } 0%, ${
              i % 2 === 0 
                ? 'rgba(147,51,234,0.1)' 
                : 'rgba(59,130,246,0.1)'
            } 40%, transparent 70%)`,
            filter: "blur(20px)",
            boxShadow: `0 0 40px ${
              i % 2 === 0 
                ? 'rgba(147,51,234,0.25)' 
                : 'rgba(59,130,246,0.25)'
            }`,
          }}
          animate={{
            x: [i * 300 - 200, window.innerWidth - (i * 300 + 200)],
            y: [i * 200 - 200, window.innerHeight - (i * 200 + 200)],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}

      {/* Interactive glow points */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-[200px] h-[200px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 3 === 0 
                ? 'rgba(147,51,234,0.3)' 
                : i % 3 === 1 
                  ? 'rgba(59,130,246,0.3)' 
                  : 'rgba(139,92,246,0.3)'
            } 0%, transparent 70%)`,
            filter: "blur(15px)",
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Subtle scanner effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(transparent, rgba(147,51,234,0.1), transparent)",
          height: "200%",
        }}
        animate={{
          y: ["-100%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Darker gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/70" />
    </div>
  );
};

const LandingText = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
    },
    show: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textLines = [
    {
      text: "make memories",
      className: "bg-gradient-to-r from-purple-500 to-blue-500",
    },
    {
      text: "post them",
      className: "bg-gradient-to-r from-blue-400 to-purple-400",
    },
    {
      text: "share the experience",
      className: "bg-gradient-to-r from-purple-300 to-blue-300",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative z-10">
      {/* Glowing backdrop for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5 blur-3xl" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center space-y-6"
      >
        {textLines.map((line, index) => (
          <motion.div
            key={index}
            variants={textVariants}
            className="relative group"
          >
            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-2 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
              style={{
                background: line.className,
                boxShadow: "0 0 10px rgba(147,51,234,0.5)",
              }}
            />
            
            {/* Main text */}
            <h1 
              className={`text-6xl font-bold tracking-tight bg-clip-text text-transparent ${line.className}`}
              style={{
                textShadow: "0 0 20px rgba(147,51,234,0.3)",
              }}
            >
              {line.text}
            </h1>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          </motion.div>
        ))}

        {/* Optional CTA Button */}
        <motion.button
          variants={textVariants}
          className="mt-12 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 transition-all duration-300 backdrop-blur-sm group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <CyberGrid />
      <GlowingOrbs />
      <ParticleEffect />
      <ScanLines />
      <InteractiveCorners />
      <FloatingOrbs />
      <EnhancedOrbs />

      {/* Content */}
      <div className="relative z-10 grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <LandingText />
        {/* <ImageMosaic /> */}
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black pointer-events-none" />
    </div>
  );
}