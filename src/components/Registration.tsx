import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Member, FellowshipCenter } from '../types';
import StreetSelector from './StreetSelector';
import LocationSelector from './LocationSelector';
import { findNearestCenter } from '../utils/locationUtils';
import { sendPastorNotification } from '../utils/notifications';
import RegistrationSuccess from './RegistrationSuccess';

export default function Registration() {
  const { churchId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState('');
  const { addMember, fellowshipCenters } = useStore();
  const [assignedCenter, setAssignedCenter] = useState<FellowshipCenter | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<Member | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    const nearestCenter = findNearestCenter(lat, lng, fellowshipCenters);
    setAssignedCenter(nearestCenter);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const selectedCenter = assignedCenter || 
      fellowshipCenters.find(center => center.streets.includes(selectedStreet));

    if (!selectedCenter) {
      alert('Please select a valid street or use location');
      setIsSubmitting(false);
      return;
    }

    const member: Member = {
      id: crypto.randomUUID(),
      ...data,
      street: selectedStreet,
      location: selectedCenter.location,
      fellowshipCenter: selectedCenter,
      church: churchId!,
      createdAt: new Date().toISOString(),
    };

    try {
      addMember(member);
      await sendPastorNotification(member, selectedCenter);
      setRegisteredMember(member);
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('There was an error completing your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationComplete && registeredMember && assignedCenter) {
    return (
      <motion.div className="max-w-2xl mx-auto">
        <div className="netflix-card p-8">
          <RegistrationSuccess 
            member={registeredMember} 
            center={assignedCenter} 
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="netflix-card p-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Join a House Fellowship</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              {...register('fullName', { required: true })}
              className="netflix-input w-full"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-[#E50914] text-sm mt-1">Full name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="netflix-input w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-[#E50914] text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            <input
              {...register('phone', { required: true })}
              className="netflix-input w-full"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-[#E50914] text-sm mt-1">Phone number is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Membership Level</label>
            <select {...register('membershipLevel')} className="netflix-input w-full">
              <option value="New">New Member</option>
              <option value="Existing">Existing Member</option>
            </select>
          </div>

          <div className="space-y-4">
            <LocationSelector onLocationSelect={handleLocationSelect} />
            <div className="text-center text-gray-400">- OR -</div>
            <StreetSelector
              fellowshipCenters={fellowshipCenters}
              onSelect={setSelectedStreet}
            />
          </div>

          {assignedCenter && (
            <div className="p-4 bg-[#E50914]/10 rounded-lg">
              <p className="text-white">
                Nearest Fellowship Center: <span className="font-bold">{assignedCenter.name}</span>
              </p>
              <p className="text-gray-300 text-sm mt-1">{assignedCenter.location.address}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || (!selectedStreet && !assignedCenter)}
            className="netflix-button w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}