"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import Header from "../components/header";
import {EnhancedOrbs} from "../components/enhanced-orbs";
import FloatingActionButton from "../components/function-button";

interface Event {
  id: number;
  date: string;
  location: string;
  attendees: number;
  description: string;
}

const sampleEvents: Event[] = [
  {
    id: 1,
    date: "Dec 24, 2024",
    location: "Central Park, NYC",
    attendees: 250,
    description: "A magical evening capturing the essence of winter in New York City.",
  },
  {
    id: 2,
    date: "July 15, 2024",
    location: "Venice Beach, LA",
    attendees: 500,
    description: "Celebrate summer with music, art, and unforgettable moments.",
  },
  {
    id: 3,
    date: "Sep 30, 2024",
    location: "Tokyo, Japan",
    attendees: 150,
    description: "Experience the neon lights and vibrant nightlife of Tokyo.",
  }
];

const EventCard = ({ event }: { event: Event }) => {
  return (
    <motion.div
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
        <p className="text-gray-400 mt-2">
          {event.description}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-colors"
        >
          Join Event
        </motion.button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500/50 group-hover:text-purple-500/70 transition-colors">
        <motion.div
          whileHover={{ x: 5 }}
          className="text-2xl"
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <EnhancedOrbs />
      <FloatingActionButton />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            Upcoming Events
          </motion.h1>

          <div className="space-y-4">
            {sampleEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;