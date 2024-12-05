import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import StatsOverview from './stats/StatsOverview';
import MeetingReportForm from './MeetingReportForm';
import ReportsList from './ReportsList';

export default function AdminDashboard() {
  const { fellowshipCenters } = useStore();
  const [selectedCenter, setSelectedCenter] = React.useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="netflix-input"
        >
          <option value="">Select Fellowship Center</option>
          {fellowshipCenters.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      <StatsOverview selectedCenter={selectedCenter} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MeetingReportForm centerId={selectedCenter} />
        <ReportsList centerId={selectedCenter} />
      </div>
    </motion.div>
  );
}