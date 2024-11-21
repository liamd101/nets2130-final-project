'use client';

import { motion } from "framer-motion";

import { useEffect, useState } from 'react';

export const EnhancedOrbs = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

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
            x: [-400, dimensions.width - 400],
            y: [-400, dimensions.height - 400],
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
            x: [dimensions.width, -200],
            y: [dimensions.height, -200],
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
              x: [i * 300 - 200, dimensions.width - (i * 300 + 200)],
              y: [i * 200 - 200, dimensions.height - (i * 200 + 200)],
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
                Math.random() * dimensions.width,
                Math.random() * dimensions.width
              ],
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height
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