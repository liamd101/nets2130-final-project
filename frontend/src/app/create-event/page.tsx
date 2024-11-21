"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import Header from "../components/header";
import { EnhancedOrbs } from "../components/enhanced-orbs";
import { useState, useRef } from "react";
import Image from "next/image";

interface EventFormData {
  date: string;
  location: string;
  attendees: number;
  description: string;
}

const CreateEventPage = () => {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [formData, setFormData] = useState<EventFormData>({
    date: "",
    location: "",
    attendees: 0,
    description: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddEvent = () => {
    setEvents((prev) => [formData, ...prev]);
    setFormData({ date: "", location: "", attendees: 0, description: "" });
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
            Create New Event
          </motion.h1>

          <div className="space-y-8">
            {/* Event Date */}
            <div className="space-y-2">
              <label className="text-purple-300">Event Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-12 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 backdrop-blur-sm outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-purple-300">Location</label>
              <input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., Central Park, NYC"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 text-purple-200 placeholder-purple-400/50 focus:border-purple-500/50 backdrop-blur-sm outline-none"
              />
            </div>

            {/* Attendees */}
            <div className="space-y-2">
              <label className="text-purple-300">Attendees</label>
              <input
                type="number"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendees: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Number of attendees"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 text-purple-200 placeholder-purple-400/50 focus:border-purple-500/50 backdrop-blur-sm outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-purple-300">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter event description"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 text-purple-200 placeholder-purple-400/50 focus:border-purple-500/50 backdrop-blur-sm outline-none"
              />
            </div>

            {/* Add Event Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddEvent}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-colors"
            >
              Add Event
            </motion.button>
          </div>

          {/* Event Cards */}
          <div className="space-y-4 mt-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-colors group"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <p className="text-gray-400 mt-2">{event.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    Join Event
                  </motion.button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500/50 group-hover:text-purple-500/70 transition-colors">
                  <motion.div whileHover={{ x: 5 }} className="text-2xl">
                    →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
