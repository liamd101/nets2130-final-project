"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, Calendar } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  let closeTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const handleCreateEvent = () => {
    router.push('/create-event');
    setIsOpen(false);
  };

  const handleUploadToEvent = () => {
    router.push('/upload-image');
    setIsOpen(false);
  };

  const buttonVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 }
  };

  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 }
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-4"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.button
              variants={itemVariants}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm text-purple-300 hover:text-purple-200 whitespace-nowrap"
              onClick={handleUploadToEvent}
            >
              <Upload className="w-4 h-4" />
              <span>Upload to Event</span>
            </motion.button>

            <motion.button
              variants={itemVariants}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm text-purple-300 hover:text-purple-200 whitespace-nowrap"
              onClick={handleCreateEvent}
            >
              <Calendar className="w-4 h-4" />
              <span>Create Event</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;