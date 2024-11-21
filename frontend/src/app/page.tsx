"use client";

import Image from "next/image";
import InlineVoteSystem from "./components/upvote";
import ImageMosaic from "./components/mosaic";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingActionButton from "./components/function-button";
import { useRouter } from "next/navigation";


const ParticleEffect = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <div className="absolute inset-0 opacity-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/20"
          initial={{ 
            x: Math.random() * dimensions.width, 
            y: Math.random() * dimensions.height,
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [-200, dimensions.width],
          y: [-200, dimensions.height],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [dimensions.width, -200],
          y: [dimensions.height, -200],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

const ScanLines = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
  </div>
);

const InteractiveCorners = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10" />
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10" />
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10" />
  </div>
);

const FloatingOrbs = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          x: [-200, dimensions.width],
          y: [-200, dimensions.height],
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
            x: [i * 300, dimensions.width - i * 200],
            y: [i * 200, dimensions.height - i * 300],
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
            x: [i * 100, dimensions.width - i * 150],
            y: [i * 150, dimensions.height - i * 100],
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black" />
    </div>
  );
};
const EnhancedOrbs = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

const AnimatedWord = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.1
      }}
    >
      <span 
        className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500
          ${isHovered ? 'drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''}`}
        style={{
          transition: 'filter 0.1s ease'
        }}
      >
        {text}
      </span>
    </motion.div>
  );
};


const LandingText = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textLines = [
    "make memories",
    "post them",
    "share the experience",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center space-y-12"
      >
        {textLines.map((line, index) => (
          <motion.div key={index} variants={textVariants}>
            <AnimatedWord text={line} />
          </motion.div>
        ))}

        <motion.button
          variants={textVariants}
          className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 backdrop-blur-sm group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/create-event")}
        >
          <span className="relative z-10 text-purple-300 group-hover:text-purple-200">
            Get Started
          </span>
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
      <FloatingActionButton />

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