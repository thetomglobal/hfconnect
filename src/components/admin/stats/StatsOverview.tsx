import React from 'react';
import { Users, DollarSign, Calendar, FileText } from 'lucide-react';
import { useStore } from '../../../store';
import StatCard from './StatCard';
import { getNextFellowshipDate } from '../../../utils/dateUtils';

export default function StatsOverview({ selectedCenter }: { selectedCenter: string }) {
  const { fellowshipCenters, meetingReports } = useStore();
  
  const centerReports = meetingReports.filter(
    report => report.fellowshipCenterId === selectedCenter
  );
  
  const totalOfferings = centerReports.reduce(
    (sum, report) => sum + report.offeringAmount,
    0
  );

  const memberCount = selectedCenter
    ? fellowshipCenters.find((c) => c.id === selectedCenter)?.members.length || 0
    : fellowshipCenters.reduce((acc, center) => acc + center.members.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={Users}
        label="Total Members"
        value={memberCount}
      />
      <StatCard
        icon={Calendar}
        label="Next Meeting"
        value={getNextFellowshipDate()}
      />
      <StatCard
        icon={DollarSign}
        label="Total Offerings"
        value={`₦${totalOfferings.toFixed(2)}`}
      />
      <StatCard
        icon={FileText}
        label="Reports"
        value={centerReports.length}
      />
    </div>
  );
}