"use client";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { motion } from "framer-motion";
import { Calendar, MapPin, Image as ImageIcon, Search } from "lucide-react";
import Header from "../components/header";
import { EnhancedOrbs } from "../components/enhanced-orbs";
import { useState, useRef, useMemo } from "react";
import Image from "next/image";

interface EventFormData {
  name: string;
  date: string;
  location: string;
  coordinates: { lat: number; lng: number } | null;
  coverImage: string | null;
}

interface LocationSearchProps {
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  formData: EventFormData;
}

const LocationSearch = ({ setFormData, formData }: LocationSearchProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setFormData({
        ...formData,
        location: address,
        coordinates: { lat, lng }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full px-12 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 placeholder-purple-400/50 backdrop-blur-sm outline-none"
        placeholder="Search for a location..."
      />
      {status === "OK" && (
        <ul className="absolute w-full mt-1 bg-black/90 border border-purple-500/30 rounded-lg overflow-hidden z-50">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-4 py-2 hover:bg-purple-500/20 cursor-pointer text-purple-300"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CreateEventPage = () => {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    date: "",
    location: "",
    coordinates: null,
    coverImage: null
  });
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const mapCenter = useMemo(() => 
    formData.coordinates || { lat: 40.7128, lng: -74.0060 }, 
    [formData.coordinates]
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, coverImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

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
            {/* Event Name */}
            <div className="space-y-2">
              <label className="text-purple-300">Event Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 placeholder-purple-400/50 backdrop-blur-sm outline-none"
                placeholder="Enter event name"
              />
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <label className="text-purple-300">Event Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-12 py-3 rounded-lg bg-black/40 border border-purple-500/30 focus:border-purple-500/50 text-purple-200 backdrop-blur-sm outline-none"
                />
              </div>
            </div>

            {/* Location with Map */}
            <div className="space-y-2">
              <label className="text-purple-300">Location</label>
              <LocationSearch setFormData={setFormData} formData={formData} />
              <div className="h-64 w-full rounded-lg overflow-hidden mt-2">
                <GoogleMap
                  zoom={14}
                  center={mapCenter}
                  mapContainerClassName="w-full h-full"
                  options={{
                    styles: [
                      {
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                          { saturation: -100 },
                          { lightness: -20 }
                        ]
                      }
                    ]
                  }}
                >
                  {formData.coordinates && (
                    <Marker position={formData.coordinates} />
                  )}
                </GoogleMap>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="text-purple-300">Cover Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-64 rounded-lg border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden group"
              >
                {formData.coverImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={formData.coverImage}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <p>Click to upload cover image</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-colors"
            >
              Create Event
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;