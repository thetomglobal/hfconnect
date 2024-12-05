import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { FellowshipCenter } from '../types';

interface LocationSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function LocationSelector({ onLocationSelect }: LocationSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSelect(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGetLocation}
        disabled={loading}
        className="netflix-button w-full flex items-center justify-center space-x-2"
      >
        <MapPin className="w-5 h-5" />
        <span>{loading ? 'Getting location...' : 'Use My Current Location'}</span>
      </button>
      
      {error && (
        <p className="text-[#E50914] text-sm mt-2">{error}</p>
      )}
    </div>
  );
}