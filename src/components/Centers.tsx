import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Users } from 'lucide-react';
import { useStore } from '../store';

export default function Centers() {
  const { fellowshipCenters } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-white mb-8">Fellowship Centers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fellowshipCenters.map((center) => (
          <motion.div
            key={center.id}
            whileHover={{ scale: 1.02 }}
            className="netflix-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{center.name}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#E50914] mt-1" />
                <p className="text-gray-300">{center.location.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#E50914]" />
                <p className="text-gray-300">Pastor: {center.pastor.name}</p>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-white">Coverage Areas:</h3>
                <ul className="list-disc list-inside text-gray-300 pl-4">
                  {center.streets.map((street, index) => (
                    <li key={index}>{street}</li>
                  ))}
                </ul>
              </div>

              {center.whatsappGroup && (
                <a
                  href={center.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="netflix-button block text-center mt-4"
                >
                  Join WhatsApp Group
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}