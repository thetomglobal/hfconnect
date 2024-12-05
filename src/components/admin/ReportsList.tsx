import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useStore } from '../../store';
import ReportActions from './ReportActions';

interface ReportsListProps {
  centerId: string;
}

export default function ReportsList({ centerId }: ReportsListProps) {
  const { getMeetingReports, fellowshipCenters } = useStore();
  const reports = getMeetingReports(centerId);
  const center = fellowshipCenters.find(c => c.id === centerId);

  if (!centerId) {
    return (
      <div className="netflix-card p-6">
        <p className="text-gray-400">Please select a fellowship center to view reports.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="netflix-card p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Meeting Reports</h2>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <p className="text-gray-400">No reports available.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="bg-black/20 p-4 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">
                    {format(new Date(report.date), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-sm text-gray-400">
                    Attendance: {report.attendanceCount}
                  </p>
                  <p className="text-sm text-gray-400">
                    Offering: ₦{report.offeringAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Status: {report.offeringPaidStatus ? 'Paid' : 'Pending'}
                  </p>
                </div>
                {center && <ReportActions report={report} center={center} />}
              </div>
              {report.notes && (
                <p className="text-sm text-gray-400 mt-2">{report.notes}</p>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}