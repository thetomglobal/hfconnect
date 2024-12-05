import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Member, FellowshipCenter } from '../types';

interface RegistrationSuccessProps {
  member: Member;
  center: FellowshipCenter;
}

export default function RegistrationSuccess({ member, center }: RegistrationSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-center">
        <div className="bg-[#E50914]/20 rounded-full p-4">
          <Check className="w-12 h-12 text-[#E50914]" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Family!</h2>
        <p className="text-gray-300">
          Thank you for registering, {member.fullName}
        </p>
      </div>

      <div className="bg-black/20 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">Your Fellowship Details</h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-gray-400">Fellowship Center</p>
            <p className="text-white font-medium">{center.name}</p>
          </div>
          
          <div>
            <p className="text-gray-400">Address</p>
            <p className="text-white font-medium">{center.location.address}</p>
          </div>
          
          <div>
            <p className="text-gray-400">Fellowship Pastor</p>
            <p className="text-white font-medium">{center.pastor.name}</p>
            <p className="text-gray-300 text-sm">{center.pastor.phone}</p>
          </div>
        </div>

        {center.whatsappGroup && (
          <a
            href={center.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="netflix-button w-full flex items-center justify-center space-x-2"
          >
            <span>Join WhatsApp Group</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-300">
          Your fellowship pastor has been notified and will contact you shortly.
        </p>
        
        <Link to="/" className="netflix-button inline-block">
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
}